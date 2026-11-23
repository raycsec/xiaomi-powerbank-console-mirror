import { useCallback, useEffect, useRef, useState } from "react";
import { HidClient } from "../hid/HidClient.js";
import { WebHidTransport } from "../hid/WebHidTransport.js";
import { TIMEOUT_MS } from "../protocol/constants.js";
import { reportQi2Event } from "../services/qi2Telemetry.js";

const AUTO_REFRESH_INTERVAL_MS = 3000;

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
  const pollTimerRef = useRef(null);
  const logsRef = useRef([]);
  const refreshingRef = useRef(false);
  const qi2BusyRef = useRef(false);
  const lastHistoryCountRef = useRef(-1);

  const appendLog = useCallback((entry) => {
    const next = [...logsRef.current.slice(-299), entry];
    logsRef.current = next;
    setLogs(next);
  }, []);

  const stopBackgroundTasks = useCallback(() => {
    if (pollTimerRef.current) {
      clearInterval(pollTimerRef.current);
      pollTimerRef.current = null;
    }
    if (workerRef.current) {
      workerRef.current.postMessage({ type: "stop" });
      workerRef.current.terminate();
      workerRef.current = null;
    }
    refreshingRef.current = false;
  }, []);

  const applyCellSensorMask = (cellList, helloInfo) => {
    const maxSensors = helloInfo?.modelConfig?.display?.maxTemperatureSensors;
    return maxSensors != null
      ? cellList.map((c, idx) => (idx < maxSensors ? c : { ...c, hasTemperatureSensor: false, temperature: null }))
      : cellList;
  };

  const fetchHistoryIfNeeded = useCallback(async (client, batt, helloInfo, force = false) => {
    if (!force && batt.historyErrorCount === lastHistoryCountRef.current) return;
    lastHistoryCountRef.current = batt.historyErrorCount;
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

  const refreshLive = useCallback(async (client, helloInfo) => {
    if (!client?.opened || refreshingRef.current || qi2BusyRef.current) return;
    refreshingRef.current = true;
    try {
      const batt = await client.getBatteryInfo();
      setBattery(batt);
      const cellList = batt.cellCount > 0 ? await client.getCellStatus(batt.cellCount) : [];
      setCells(applyCellSensorMask(cellList, helloInfo));
      await fetchHistoryIfNeeded(client, batt, helloInfo, false);
    } catch {
      // Transient polling errors are ignored; physical disconnect triggers onDisconnect.
    } finally {
      refreshingRef.current = false;
    }
  }, [fetchHistoryIfNeeded]);

  const loadInitialSnapshot = useCallback(async (client, helloInfo) => {
    refreshingRef.current = true;
    try {
      const batt = await client.getBatteryInfo();
      setBattery(batt);

      const cellList = batt.cellCount > 0 ? await client.getCellStatus(batt.cellCount) : [];
      setCells(applyCellSensorMask(cellList, helloInfo));

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

      await fetchHistoryIfNeeded(client, batt, helloInfo, true);
    } finally {
      refreshingRef.current = false;
    }
  }, [fetchHistoryIfNeeded]);

  const startBackgroundTasks = useCallback((client, helloInfo) => {
    stopBackgroundTasks();
    if (typeof Worker !== "undefined") {
      const worker = new Worker(new URL("../workers/heartbeat.worker.js", import.meta.url), { type: "module" });
      worker.onmessage = () => {
        if (!qi2BusyRef.current && client.opened) void client.sendHeartbeat();
      };
      worker.postMessage({ type: "start", interval: TIMEOUT_MS.HEARTBEAT_INTERVAL });
      workerRef.current = worker;
    }
    pollTimerRef.current = setInterval(() => {
      void refreshLive(client, helloInfo);
    }, AUTO_REFRESH_INTERVAL_MS);
  }, [refreshLive, stopBackgroundTasks]);

  const startSession = useCallback(async (transport) => {
    setStatus("connecting");
    setQi2Error("");
    lastHistoryCountRef.current = -1;
    logsRef.current = [];
    setLogs([]);
    const client = new HidClient(transport, {
      onLog: appendLog,
      onDisconnect: () => {
        stopBackgroundTasks();
        setStatus("idle");
        setHello(null);
        setBattery(null);
      },
    });
    clientRef.current = client;
    await client.open();
    const helloInfo = await client.handshake();
    setHello(helloInfo);
    setStatus("connected");
    await loadInitialSnapshot(client, helloInfo);
    startBackgroundTasks(client, helloInfo);
  }, [appendLog, loadInitialSnapshot, startBackgroundTasks, stopBackgroundTasks]);

  const connectWebHid = useCallback(async () => {
    const transport = await WebHidTransport.request();
    if (!transport) return;
    await startSession(transport);
  }, [startSession]);

  const disconnect = useCallback(async () => {
    stopBackgroundTasks();
    const client = clientRef.current;
    clientRef.current = null;
    if (client) await client.disconnect();
    setStatus("idle");
    setHello(null);
    setBattery(null);
    setCells([]);
    setCellIds({});
    setHistory([]);
    setQi2Status(null);
  }, [stopBackgroundTasks]);

  const toggleQi2 = useCallback(async (targetEnabled) => {
    const client = clientRef.current;
    const qi2Cfg = hello?.modelConfig?.capabilities?.qi2;
    if (!client || !qi2Cfg?.protocols?.length || qi2BusyRef.current) return;
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
      void reportQi2Event({
        model: hello?.modelConfig?.model,
        snBytes: hello?.snBytes,
        action: targetEnabled,
        ok: true,
        detail,
        info: { ...baseInfo, protocol: result.protocol, writeStatus: result.writeStatus ?? 0, readbackTries: result.attempts, readback: result.status.enabled },
        devLogs: logsRef.current.slice(flowStart),
      });
    } catch (err) {
      setQi2Error(err.message);
      void reportQi2Event({
        model: hello?.modelConfig?.model,
        snBytes: hello?.snBytes,
        action: targetEnabled,
        ok: false,
        detail: err.message,
        info: baseInfo,
        devLogs: logsRef.current.slice(flowStart),
      });
    } finally {
      qi2BusyRef.current = false;
      setQi2Stage("");
      setQi2Busy(false);
    }
  }, [battery, cellIds, hello, tempModel]);

  useEffect(() => () => stopBackgroundTasks(), [stopBackgroundTasks]);

  return {
    client: clientRef.current,
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
    refresh: () => clientRef.current && refreshLive(clientRef.current, hello),
    toggleQi2,
    clearLogs: () => {
      logsRef.current = [];
      setLogs([]);
    },
  };
}
