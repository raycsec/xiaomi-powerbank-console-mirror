import type { ParsedBatteryId } from "../protocol/cellIdentity.js";

export type Qi2Mode = "enabled" | "experimental" | "unsupported_firmware" | "pending" | "none";
export type Qi2ProtocolId = "encrypted" | "encrypted-compat" | "legacy";
export type Qi2ResolvedProtocol =
  | "encrypted"
  | "encrypted-cycles0"
  | "encrypted-raw-sn"
  | "encrypted-raw-sn-cycles0"
  | "encrypted-compat"
  | "encrypted-compat-cycles0"
  | "encrypted-compat-raw-sn"
  | "encrypted-compat-raw-sn-cycles0"
  | "legacy"
  | "legacy-padded32";

export interface ModelCapabilities {
  qi2: {
    mode: Qi2Mode;
    protocols: Qi2ProtocolId[];
    allowDisable: boolean;
  };
  supportsTempModelQuery: boolean;
  historyMinTimestamp: number;
}

export interface ModelDisplayConfig {
  showInModelList: boolean;
  showSerialNumber: boolean;
  showCellSerialNumber: boolean;
  maxTemperatureSensors: number | null;
}

export interface PowerBankModelConfig {
  id: number | null;
  model: string;
  name: string;
  nameEn: string;
  connection: string;
  tempRange: string;
  isUnknown?: boolean;
  capabilities: ModelCapabilities;
  display: ModelDisplayConfig;
}

export interface ParsedFrame {
  head: number;
  command: number;
  length: number;
  payload: Uint8Array;
  checksum: number;
  expectedChecksum: number;
  crcValid: boolean;
  raw: Uint8Array;
}

export interface HelloResponse {
  modelId: number;
  snBytes: Uint8Array;
  serialNumber: string;
  isNonAsciiSerial: boolean;
  chargeState: number;
  modelConfig: PowerBankModelConfig;
}

export interface HandshakeResult {
  isEcho: boolean;
  timestamp: number;
  modelId: number | null;
  snBytes: Uint8Array;
  serialNumber: string;
  chargeState: number;
  modelConfig: PowerBankModelConfig | null;
}

export interface BatteryInfo {
  statusCode: number;
  success: boolean;
  activateStatus: number;
  cycleCount: number;
  health: number;
  chargeState: number;
  faultType: number;
  faultRaw: number;
  errorValue: number;
  historyErrorCount: number;
  series: number;
  parallel: number;
  cellCount: number;
  level: number;
  temperature: number;
  voltage: number;
  current: number;
}

export interface CellStatus {
  index: number;
  temperature: number | null;
  hasTemperatureSensor: boolean;
  voltage: number;
  current: number;
}

export interface BatteryIdInfo {
  index: number;
  raw: string;
  parsed: ParsedBatteryId | null;
}

export interface TempModelInfo {
  success: boolean;
  lowTemp: number | null;
  highTemp: number | null;
  batteryModel: string;
}

export interface HistoryEntry {
  timestamp: number;
  cellIndex: number;
  stateCode: number;
  stateLabel: string;
  errorType: number;
  faultLabel: string;
  nationalStandardFault: string;
  value: number;
  formattedValue: string;
}

export interface Qi2Status {
  statusCode: number;
  success: boolean;
  enabled: boolean;
}

export interface Qi2WriteResponse {
  statusCode: number;
  success: boolean;
}

export interface Qi2StrategyError {
  protocol: Qi2ProtocolId;
  message: string;
}

export interface Qi2StrategyResult {
  protocol: Qi2ResolvedProtocol;
  skipped: boolean;
  writeStatus?: number;
  status: Qi2Status;
  attempts: number;
  diagnostics?: {
    modelId: number;
    health: number;
    cycles: number;
    fault: number;
    padded32?: boolean;
    snMode?: string;
    cyclesEncoded?: number;
  };
}

export interface Qi2SetResult extends Qi2StrategyResult {
  usedFallback: boolean;
  errors: Qi2StrategyError[];
}

export type HidLogDirection = "TX" | "RX" | "INFO" | "WARN" | "ERROR";

export interface HidLogEntry {
  at: string;
  direction: HidLogDirection;
  label: string;
  hex: string;
  meta?: Record<string, unknown>;
}

export interface HidDeviceInfo {
  productName: string;
  vendorId: number;
  productId: number;
}

export interface HidTransport {
  kind: "webhid" | "demo";
  info: HidDeviceInfo;
  open(): Promise<void>;
  close(): Promise<void>;
  send(frame: Uint8Array): Promise<void>;
  onInputReport(handler: (data: Uint8Array) => void): () => void;
  onDisconnect(handler: () => void): () => void;
}

export interface Qi2Stats {
  ok: boolean;
  model: string;
  total: number;
  success: number;
  failure?: number;
  errors?: number;
  successRate: number;
  errorRate: number;
}

export type LocaleCode = "zh-CN" | "zh-rCN" | "en";
