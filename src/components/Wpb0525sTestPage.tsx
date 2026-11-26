import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { usePowerBank } from "../hooks/usePowerBank.js";
import { hashSerialHex } from "../services/qi2Telemetry.js";
import {
  evaluateWpb0525sProtocolParity,
  getLoadedWpb0525sTestPack,
  loadWpb0525sTestPack,
  runWpb0525sAlgorithmPack,
  type Wpb0525sAlgorithmDefinition,
  type Wpb0525sGroupRunResult,
  type Wpb0525sRunSummary,
  type Wpb0525sTestPack,
} from "../services/wpb0525sPack.js";

type GroupRunState = "idle" | "running" | "ok" | "skipped" | "fail";

export default function Wpb0525sTestPage() {
  const pb = usePowerBank();
  const [pack, setPack] = useState<Wpb0525sTestPack>(() => getLoadedWpb0525sTestPack());
  const [selectedIds, setSelectedIds] = useState<string[]>(() =>
    getLoadedWpb0525sTestPack()
      .algorithms.filter((a) => a.enabled !== false)
      .map((a) => a.id),
  );
  const [stopOnSuccess, setStopOnSuccess] = useState<boolean>(
    () => getLoadedWpb0525sTestPack().testSiteMeta?.defaultStopOnSuccess ?? true,
  );
  const [forceWrite, setForceWrite] = useState<boolean>(false);
  const [running, setRunning] = useState<boolean>(false);
  const [activeAlgId, setActiveAlgId] = useState<string | null>(null);
  const [progress, setProgress] = useState<{ done: number; total: number }>({ done: 0, total: 0 });
  const [groupResults, setGroupResults] = useState<Record<string, Wpb0525sGroupRunResult>>({});
  const [lastSummary, setLastSummary] = useState<Wpb0525sRunSummary | null>(null);
  const [reportState, setReportState] = useState<string>("");
  const [copyTip, setCopyTip] = useState<string>("");

  const syncPackState = useCallback((nextPack: Wpb0525sTestPack) => {
    setPack(nextPack);
    setSelectedIds(nextPack.algorithms.filter((a) => a.enabled !== false).map((a) => a.id));
    setStopOnSuccess(nextPack.testSiteMeta?.defaultStopOnSuccess ?? true);
  }, []);

  useEffect(() => {
    let mounted = true;
    void loadWpb0525sTestPack().then((loaded) => {
      if (mounted) syncPackState(loaded);
    });
    return () => {
      mounted = false;
    };
  }, [syncPackState]);

  const handleReloadPack = async () => {
    const reloaded = await loadWpb0525sTestPack(true);
    syncPackState(reloaded);
    setGroupResults({});
    setLastSummary(null);
    setReportState(`已热重载算法包：${reloaded.testSiteVersion}（共 ${reloaded.algorithms.length} 组算法）`);
  };

  const parity = useMemo(() => evaluateWpb0525sProtocolParity(pack), [pack]);

  const groupedAlgorithms = useMemo(() => {
    const map = new Map<string, Wpb0525sAlgorithmDefinition[]>();
    for (const alg of pack.algorithms) {
      const key = alg.group || "custom";
      const list = map.get(key) || [];
      list.push(alg);
      map.set(key, list);
    }
    return Array.from(map.entries());
  }, [pack.algorithms]);

  const formattedLogs = useMemo(() => {
    const formatter = pack.formatDebugEntry;
    return pb.logs.map((entry) =>
      formatter
        ? formatter(entry as unknown as Record<string, unknown>)
        : (entry as unknown as Record<string, unknown>),
    );
  }, [pb.logs, pack]);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const uploadTestTelemetry = useCallback(
    async (summary: Wpb0525sRunSummary, targetEnabled: boolean, flowLogs: Record<string, unknown>[]) => {
      const endpoint = pack.apiConfig?.reportEndpoint || "/api/0525s-test/report";
      const fallbackEndpoint = pack.apiConfig?.fallbackReportEndpoint || "/api/qi2-report";
      try {
        const snHash = await hashSerialHex(pb.hello?.snBytes, pb.hello?.modelConfig?.model || "WPB0525S");
        const basePayload: Record<string, unknown> = {
          model: String(pb.hello?.modelConfig?.model || "WPB0525S").toUpperCase(),
          snHash,
          action: targetEnabled ? "on" : "off",
          appVersion: pack.testSiteVersion,
          reportedAt: new Date().toISOString(),
          pageUrl: typeof location !== "undefined" ? location.origin + location.pathname : "/0525s-test",
          ok: summary.overallOk,
          detail: summary.winningAlgorithmId ? `0525s-test:${summary.winningAlgorithmId}` : "0525s-test-failed",
          info: {
            modelId: pb.hello?.modelId ?? null,
            snLen: pb.hello?.snBytes?.length ?? 0,
            health: pb.battery?.health ?? null,
            cycles: pb.battery?.cycleCount ?? null,
            level: pb.battery?.level ?? null,
            temp: pb.battery?.temperature ?? null,
            voltage: pb.battery?.voltage ?? null,
            chgState: pb.battery?.chargeState ?? null,
            fault: pb.battery?.faultType ?? null,
          },
          devLogs: flowLogs.slice(-300),
        };
        const finalPayload = pack.formatTelemetryPayload
          ? pack.formatTelemetryPayload(basePayload, summary)
          : basePayload;

        const headers: Record<string, string> = {
          "content-type": "application/json",
          ...(pack.apiConfig?.extraHeaders || {}),
        };
        let res = await fetch(endpoint, {
          method: "POST",
          headers,
          credentials: "same-origin",
          body: JSON.stringify(finalPayload),
        });
        if (res.status === 404 && fallbackEndpoint && fallbackEndpoint !== endpoint) {
          res = await fetch(fallbackEndpoint, {
            method: "POST",
            headers,
            credentials: "same-origin",
            body: JSON.stringify(finalPayload),
          });
        }
        setReportState(res.ok ? `测试反馈已上报 (${endpoint}, HTTP ${res.status})` : `上报返回 HTTP ${res.status}`);
      } catch (err) {
        setReportState(`上报失败：${err instanceof Error ? err.message : String(err)}`);
      }
    },
    [pack, pb.battery, pb.hello],
  );

  const executeAlgorithms = async (targetEnabled: boolean, overrideIds?: string[]) => {
    if (!pb.client || running) return;
    const ids = overrideIds && overrideIds.length > 0 ? overrideIds : selectedIds;
    if (!ids.length) {
      setReportState("请至少勾选 1 组算法后再执行");
      return;
    }

    setRunning(true);
    setReportState("");
    setActiveAlgId(null);
    setProgress({ done: 0, total: ids.length });
    if (!overrideIds) {
      setGroupResults({});
    }
    const logStart = pb.logs.length;

    try {
      const summary = await runWpb0525sAlgorithmPack(pb.client, {
        targetEnabled,
        pack,
        selectedAlgorithmIds: ids,
        stopOnSuccess: overrideIds ? true : stopOnSuccess,
        skipInitialStateCheck: forceWrite,
        onGroupStart: (alg, index, total) => {
          setActiveAlgId(alg.id);
          setProgress({ done: index, total });
        },
        onGroupFinish: (result, index, total) => {
          setGroupResults((prev) => ({ ...prev, [result.algorithmId]: result }));
          setProgress({ done: index + 1, total });
        },
      });
      setLastSummary(summary);
      setActiveAlgId(null);
      const flowLogs = pb.logs
        .slice(logStart)
        .map((entry) =>
          pack.formatDebugEntry
            ? pack.formatDebugEntry(entry as unknown as Record<string, unknown>)
            : (entry as unknown as Record<string, unknown>),
        );
      await uploadTestTelemetry(summary, targetEnabled, flowLogs);
      void pb.refresh();
    } catch (err) {
      setReportState(`执行异常：${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setRunning(false);
      setActiveAlgId(null);
    }
  };

  const buildExportJson = () => {
    const base = {
      exportedAt: new Date().toISOString(),
      device: {
        model: pb.hello?.modelConfig?.model || null,
        modelId: pb.hello?.modelId ?? null,
        serialNumber: pb.hello?.serialNumber || null,
        snLen: pb.hello?.snBytes?.length ?? 0,
        qi2Enabled: pb.qi2Status?.enabled ?? null,
        battery: pb.battery || null,
      },
      parity,
      summary: lastSummary,
      logs: formattedLogs,
    };
    const finalObj = pack.formatApiOutput ? pack.formatApiOutput("/0525s-test/export", base) : base;
    return JSON.stringify(finalObj, null, 2);
  };

  const handleCopyReport = async () => {
    try {
      await navigator.clipboard.writeText(buildExportJson());
      setCopyTip("已复制 JSON 调试报告");
      setTimeout(() => setCopyTip(""), 2500);
    } catch {
      setCopyTip("复制失败，请使用导出下载");
    }
  };

  const handleDownloadReport = () => {
    const blob = new Blob([buildExportJson()], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `0525s-test-report-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getGroupState = (id: string): GroupRunState => {
    if (activeAlgId === id) return "running";
    const r = groupResults[id];
    if (!r) return "idle";
    if (r.skipped) return "skipped";
    return r.ok ? "ok" : "fail";
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <section className="card">
        <div className="card-head-row" style={{ alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <h1 className="card-title-lg" style={{ margin: 0 }}>
                {pack.testSiteMeta?.title || "WPB0525S 实验算法测试站"}
              </h1>
              <span className="badge badge--blue mono">{pack.testSiteVersion}</span>
              <span className={`badge ${parity.matched ? "badge--green" : "badge--amber"}`}>
                {parity.matched ? "协议与主站一致" : "测试站含新实验协议"}
              </span>
            </div>
            <p className="card-subtitle" style={{ marginTop: 4 }}>
              {pack.testSiteMeta?.subtitle || "独立热更新算法包驱动 · 自适应不限算法组数"}
            </p>
            <div className="mono" style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 6 }}>
              主站协议标记：{parity.mainProtocolVersion} ｜ 测试站协议标记：{parity.testProtocolVersion} ｜ 已载入算法组：{pack.algorithms.length} 组
            </div>
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button type="button" className="ui-btn ui-btn--neutral ui-btn--sm" onClick={handleReloadPack} disabled={running}>
              热重载算法包 JS
            </button>
            <Link to="/" className="ui-btn ui-btn--neutral ui-btn--sm">
              返回主站
            </Link>
          </div>
        </div>
      </section>

      <section className="card">
        <div className="card-head-row" style={{ flexWrap: "wrap", gap: 12 }}>
          <div>
            <div className="card-title-base">
              {pb.isConnected
                ? `已连接：${pb.hello?.modelConfig?.model || "未知机型"} (ID=${pb.hello?.modelId ?? "-"})`
                : "连接设备（WebHID）"}
            </div>
            <p className="card-subtitle" style={{ marginTop: 4 }}>
              {pb.isConnected
                ? `SN=${pb.hello?.serialNumber || "-"} (${pb.hello?.snBytes?.length ?? 0}B) · 电量 ${pb.battery?.level ?? "--"}% · 健康 ${pb.battery?.health ?? "--"}% · 循环 ${pb.battery?.cycleCount ?? "--"} · Qi2.2(0x17)=${pb.qi2Status?.enabled ? "已开启(1)" : "未开启(0)"}`
                : "按 8 次电源键进入 HID 模式后点击连接。同一设备同一时间只能由一个标签页占用。"}
            </p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {!pb.isConnected ? (
              <button type="button" className="ui-btn ui-btn--primary" onClick={pb.connectWebHid}>
                连接移动电源
              </button>
            ) : (
              <button type="button" className="ui-btn ui-btn--danger-outline ui-btn--sm" onClick={pb.disconnect} disabled={running}>
                断开连接
              </button>
            )}
          </div>
        </div>

        <div
          style={{
            marginTop: 14,
            paddingTop: 12,
            borderTop: "1px solid var(--border-divider)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center", fontSize: 12 }}>
            <label style={{ display: "inline-flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={stopOnSuccess}
                onChange={(e) => setStopOnSuccess(e.target.checked)}
                disabled={running}
              />
              命中即停（短路模式）
            </label>
            <label style={{ display: "inline-flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={forceWrite}
                onChange={(e) => setForceWrite(e.target.checked)}
                disabled={running}
              />
              忽略 0x17 初始态强制下发
            </label>
            <span className="mono" style={{ color: "var(--text-muted)" }}>
              已选 {selectedIds.length} / {pack.algorithms.length} 组
              {running ? ` · 进度 ${progress.done}/${progress.total}` : ""}
            </span>
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button
              type="button"
              className="ui-btn ui-btn--primary"
              disabled={!pb.isConnected || running || selectedIds.length === 0}
              onClick={() => void executeAlgorithms(true)}
            >
              {running ? "测试执行中..." : "⚡ 开启 Qi2.2（跑选中组）"}
            </button>
            <button
              type="button"
              className="ui-btn ui-btn--neutral"
              disabled={!pb.isConnected || running || selectedIds.length === 0}
              onClick={() => void executeAlgorithms(false)}
            >
              ⏻ 关闭 Qi2.2（跑选中组）
            </button>
          </div>
        </div>

        {reportState && (
          <div style={{ marginTop: 10, fontSize: 12, color: "var(--blue-primary)" }}>{reportState}</div>
        )}
      </section>

      <section className="card">
        <div className="card-head-row" style={{ flexWrap: "wrap", gap: 8 }}>
          <div>
            <div className="card-title-base">自适应算法组列表（共 {pack.algorithms.length} 组，无上限）</div>
            <div className="card-subtitle">直接编辑独立文件 <code>/0525s-test-pack.js</code> 即可增删改算法组与参数</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              type="button"
              className="ui-btn ui-btn--neutral ui-btn--sm"
              disabled={running}
              onClick={() => setSelectedIds(pack.algorithms.map((a) => a.id))}
            >
              全选
            </button>
            <button
              type="button"
              className="ui-btn ui-btn--neutral ui-btn--sm"
              disabled={running}
              onClick={() => setSelectedIds([])}
            >
              清空
            </button>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 12 }}>
          {groupedAlgorithms.map(([groupName, list]) => (
            <div key={groupName} className="inner-group" style={{ padding: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-secondary)", marginBottom: 8 }}>
                分组：{groupName}（{list.length} 组）
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {list.map((alg) => {
                  const st = getGroupState(alg.id);
                  const res = groupResults[alg.id];
                  const badgeClass =
                    st === "ok"
                      ? "badge--green"
                      : st === "skipped"
                        ? "badge--blue"
                        : st === "fail"
                          ? "badge--red"
                          : st === "running"
                            ? "badge--amber"
                            : "";
                  const badgeLabel =
                    st === "ok"
                      ? "成功"
                      : st === "skipped"
                        ? "已跳过"
                        : st === "fail"
                          ? `失败${res?.writeStatus != null ? ` (status=${res.writeStatus})` : ""}`
                          : st === "running"
                            ? "执行中..."
                            : "待测";

                  return (
                    <div
                      key={alg.id}
                      style={{
                        background: "var(--bg-card)",
                        border: "1px solid var(--border-card)",
                        borderRadius: 8,
                        padding: "10px 12px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 12,
                        flexWrap: "wrap",
                      }}
                    >
                      <div style={{ minWidth: 0, flex: "1 1 280px" }}>
                        <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                          <input
                            type="checkbox"
                            checked={selectedIds.includes(alg.id)}
                            onChange={() => toggleSelect(alg.id)}
                            disabled={running}
                          />
                          <span style={{ fontWeight: 600, fontSize: 13 }}>{alg.name}</span>
                          <span className="mono" style={{ fontSize: 11, color: "var(--text-muted)" }}>
                            [{alg.id}]
                          </span>
                        </label>
                        {alg.description && (
                          <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 3, paddingLeft: 22 }}>
                            {alg.description}
                          </div>
                        )}
                        <div className="mono" style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4, paddingLeft: 22 }}>
                          transport={alg.transport} · {alg.padded32 ? "32B" : "compact"} · hello={alg.helloMode || "full13"}
                          {alg.snMode ? ` · sn=${alg.snMode}` : ""}
                          {alg.cyclesMode != null ? ` · cycles=${String(alg.cyclesMode)}` : ""}
                          {res ? ` · ${res.durationMs}ms · ${res.detail}` : ""}
                        </div>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                        <span className={`badge ${badgeClass}`}>{badgeLabel}</span>
                        <button
                          type="button"
                          className="ui-btn ui-btn--neutral ui-btn--sm"
                          disabled={!pb.isConnected || running}
                          onClick={() => void executeAlgorithms(true, [alg.id])}
                        >
                          单测开
                        </button>
                        <button
                          type="button"
                          className="ui-btn ui-btn--neutral ui-btn--sm"
                          disabled={!pb.isConnected || running}
                          onClick={() => void executeAlgorithms(false, [alg.id])}
                        >
                          单测关
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {lastSummary && (
        <section className="card">
          <div className="card-title-base">本轮自适应执行汇总</div>
          <div className="kpi-grid" style={{ marginTop: 10 }}>
            <div className="kpi-item">
              <div className="kpi-label">执行组数</div>
              <div className="kpi-value">{lastSummary.totalGroups}</div>
            </div>
            <div className="kpi-item">
              <div className="kpi-label">真实成功</div>
              <div className="kpi-value">{lastSummary.passedCount}</div>
            </div>
            <div className="kpi-item">
              <div className="kpi-label">跳过</div>
              <div className="kpi-value">{lastSummary.skippedCount}</div>
            </div>
            <div className="kpi-item">
              <div className="kpi-label">失败</div>
              <div className="kpi-value">{lastSummary.failedCount}</div>
            </div>
          </div>
          <div className="mono" style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 10 }}>
            命中算法：{lastSummary.winningAlgorithmId || "无"} · 总耗时：{lastSummary.durationMs}ms
          </div>
        </section>
      )}

      <section className="card">
        <div className="card-head-row" style={{ flexWrap: "wrap", gap: 8 }}>
          <div>
            <div className="card-title-base">自适应调试日志与反馈导出（{formattedLogs.length} 条）</div>
            <div className="card-subtitle">所有日志格式与导出结构均受 0525s-test-pack.js 输出钩子控制</div>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button type="button" className="ui-btn ui-btn--neutral ui-btn--sm" onClick={() => void handleCopyReport()}>
              复制 JSON 报告
            </button>
            <button type="button" className="ui-btn ui-btn--neutral ui-btn--sm" onClick={handleDownloadReport}>
              下载 JSON 报告
            </button>
            <button type="button" className="ui-btn ui-btn--neutral ui-btn--sm" onClick={pb.clearLogs}>
              清空日志
            </button>
          </div>
        </div>
        {copyTip && <div style={{ fontSize: 12, color: "var(--green-text)", marginTop: 6 }}>{copyTip}</div>}
        <pre
          className="mono"
          style={{
            marginTop: 10,
            padding: 12,
            borderRadius: 8,
            background: "var(--bg-inner)",
            border: "1px solid var(--border-card)",
            maxHeight: 320,
            overflow: "auto",
            fontSize: 11,
            lineHeight: 1.5,
            whiteSpace: "pre-wrap",
            wordBreak: "break-all",
          }}
        >
          {formattedLogs.length === 0
            ? "暂无 HID 调试日志，连接设备并执行算法组后将在此实时输出。"
            : formattedLogs
                .slice(-150)
                .map((item) => {
                  const dir = String(item.direction || "INFO");
                  const at = String(item.at || "").slice(11, 23);
                  const label = String(item.label || "");
                  const hex = item.hex ? ` | ${String(item.hex)}` : "";
                  return `[${at}] [${dir}] ${label}${hex}`;
                })
                .join("\n")}
        </pre>
      </section>
    </div>
  );
}
