import { useCallback, useEffect, useRef, useState } from "react";
import { HidClient } from "../hid/HidClient.js";
import { WebHidTransport } from "../hid/WebHidTransport.js";
import { AUTO_REFRESH_MS, TIMEOUT_MS } from "../protocol/constants.js";
import { reportQi2Event } from "../services/qi2Telemetry.js";

export function usePowerBank() {
  const [status, setStatus] = useState("idle");
  const [hello, setHello] = useState(null);
  const [battery, setBattery] = useState(null);
  const [cells, setCells] = useState([]);
  const [cellIds, setCellIds] = useState({});
  const [tempModel, setTempModel] = useState(null);
  const [history, setHistory] = useState([]);
  const [qi2Status, setQi2Status] = useState(null);
  const [qi2Busy, setQi2Busy] = useState(false);
  const [qi2Stage, setQi2Stage] = useState("");
  const [qi2Error, setQi2Error] = useState("");
  const [logs, setLogs] = useState([]);

  const clientRef = useRef(null);
  const workerRef = useRef(null);
  const logsRef = useRef([]);
  const helloRef = useRef(null);
  const qi2BusyRef = useRef(false);

  const appendLog = useCallback((entry) => {
    const next = [...logsRef.current.slice(-299), entry];
    logsRef.current = next;
    setLogs(next);
  }, []);

  const stopHeartbeat = useCallback(() => {
    if (workerRef.current) {
      workerRef.current.postMessage({ type: "stop" });
      workerRef.current.terminate();
      workerRef.current = null;
    }
  }, []);

  const startHeartbeat = useCallback((client) => {
    stopHeartbeat();
    if (typeof Worker === "undefined") return;
    const worker = new Worker(new URL("../workers/heartbeat.worker.js", import.meta.url), { type: "module" });
    worker.onmessage = () => {
      void client.sendHeartbeat();
    };
    worker.postMessage({ type: "start", interval: TIMEOUT_MS.HEARTBEAT_INTERVAL });
    workerRef.current = worker;
  }, [stopHeartbeat]);

  const refreshAll = useCallback(async (client, helloInfo) => {
    const batt = await client.getBatteryInfo();
    setBattery(batt);

    const cellList = batt.cellCount > 0 ? await client.getCellStatus(batt.cellCount) : [];
    const maxSensors = helloInfo?.modelConfig?.display?.maxTemperatureSensors;
    setCells(
      maxSensors != null
        ? cellList.map((c, idx) => (idx < maxSensors ? c : { ...c, hasTemperatureSensor: false, temperature: null }))
        : cellList,
    );

    if (helloInfo?.modelConfig?.capabilities?.supportsTempModelQuery) {
      try {
        setTempModel(await client.getTempModel());
      } catch {
        setTempModel(null);
      }
    }

    const ids = {};
    for (let i = 1; i <= Math.min(batt.cellCount, 8); i += 1) {
      try {
        ids[i] = await client.getBatteryId(i);
      } catch {}
    }
    setCellIds(ids);

    if (helloInfo?.modelConfig?.capabilities?.qi2?.mode !== "none") {
      try {
        setQi2Status(await client.getQi2Status());
      } catch {
        setQi2Status(null);
      }
    }

    if (batt.historyErrorCount > 0) {
      const minTs = helloInfo?.modelConfig?.capabilities?.historyMinTimestamp ?? 0;
      const all = [];
      for (let start = 1; start <= Math.min(100, batt.historyErrorCount); start += 7) {
        const end = Math.min(batt.historyErrorCount, start + 6);
        const batch = await client.getHistory(start, end, minTs);
        all.push(...batch);
      }
      setHistory(all.sort((a, b) => b.timestamp - a.timestamp));
    } else {
      setHistory([]);
    }
  }, []);

  const startSession = useCallback(async (transport) => {
    setStatus("connecting");
    setQi2Error("");
    logsRef.current = [];
    setLogs([]);
    const client = new HidClient(transport, {
      onLog: appendLog,
      onDisconnect: () => {
        stopHeartbeat();
        setStatus("idle");
        helloRef.current = null;
        setHello(null);
        setBattery(null);
      },
    });
    clientRef.current = client;
    await client.open();
    const helloInfo = await client.handshake();
    helloRef.current = helloInfo;
    setHello(helloInfo);
    setStatus("connected");
    await refreshAll(client, helloInfo);
    startHeartbeat(client);
  }, [appendLog, refreshAll, startHeartbeat, stopHeartbeat]);

  const connectWebHid = useCallback(async () => {
    const transport = await WebHidTransport.request();
    if (!transport) return;
    await startSession(transport);
  }, [startSession]);

  const disconnect = useCallback(async () => {
    stopHeartbeat();
    const client = clientRef.current;
    clientRef.current = null;
    if (client) await client.disconnect();
    setStatus("idle");
    helloRef.current = null;
    setHello(null);
    setBattery(null);
    setCells([]);
    setCellIds({});
    setHistory([]);
    setQi2Status(null);
  }, [stopHeartbeat]);

  const toggleQi2 = useCallback(async (targetEnabled) => {
    const client = clientRef.current;
    const qi2Cfg = hello?.modelConfig?.capabilities?.qi2;
    if (!client || !qi2Cfg?.protocols?.length || qi2Busy) return;
    qi2BusyRef.current = true;
    setQi2Busy(true);
    setQi2Stage("handshake");
    setQi2Error("");
    const flowStart = logsRef.current.length;
    const firstParsed = Object.values(cellIds).find((c) => c.parsed)?.parsed;
    const firstCellRaw = Object.values(cellIds).find((c) => c.raw)?.raw || "--";
    const baseInfo = {
      modelId: hello?.modelId,
      snLen: hello?.snBytes?.length ?? 0,
      health: battery?.health,
      cycles: battery?.cycleCount,
      level: battery?.level,
      temp: battery?.temperature,
      voltage: battery?.voltage,
      chgState: battery?.chargeState,
      fault: battery?.faultType,
      faultRaw: battery?.faultRaw,
      statusCode: battery?.statusCode,
      batteryModel: tempModel?.batteryModel || firstParsed?.miCodeInfo?.cellModel || "--",
      batteryCode: firstCellRaw,
      batteryManufacturer: firstParsed?.fixed?.assemblyFactory || "--",
      batteryProductionDate: firstParsed?.fixed?.productionDate || "--",
    };

    try {
      setQi2Stage("writing");
      const result = await client.setQi2(targetEnabled, qi2Cfg.protocols);
      setQi2Stage("readback");
      setQi2Status(result.status);
      const detail = result.skipped
        ? `${result.protocol}-skipped`
        : result.usedFallback
          ? `${result.protocol}-fallback`
          : result.protocol;
      if (status === "connected") {
        void reportQi2Event({
          model: hello?.modelConfig?.model,
          snBytes: hello?.snBytes,
          action: targetEnabled,
          ok: true,
          detail,
          info: { ...baseInfo, protocol: result.protocol, writeStatus: result.writeStatus ?? 0, readbackTries: result.attempts, readback: result.status.enabled },
          devLogs: logsRef.current.slice(flowStart),
        });
      }
    } catch (err) {
      setQi2Error(err.message);
      if (status === "connected") {
        void reportQi2Event({
          model: hello?.modelConfig?.model,
          snBytes: hello?.snBytes,
          action: targetEnabled,
          ok: false,
          detail: err.message,
          info: baseInfo,
          devLogs: logsRef.current.slice(flowStart),
        });
      }
    } finally {
      setQi2Stage("");
      setQi2Busy(false);
      qi2BusyRef.current = false;
    }
  }, [battery, cellIds, hello, qi2Busy, status, tempModel]);

  useEffect(() => () => stopHeartbeat(), [stopHeartbeat]);

  useEffect(() => {
    if (status !== "connected") return undefined;
    const timer = setInterval(() => {
      const client = clientRef.current;
      if (!client || qi2BusyRef.current) return;
      void refreshAll(client, helloRef.current).catch(() => undefined);
    }, AUTO_REFRESH_MS);
    return () => clearInterval(timer);
  }, [refreshAll, status]);

  return {
    status,
    isConnected: status === "connected",
    hello,
    battery,
    cells,
    cellIds,
    tempModel,
    history,
    qi2Status,
    qi2Busy,
    qi2Stage,
    qi2Error,
    logs,
    connectWebHid,
    disconnect,
    refresh: () => clientRef.current && refreshAll(clientRef.current, hello),
    toggleQi2,
    clearLogs: () => {
      logsRef.current = [];
      setLogs([]);
    },
  };
}
