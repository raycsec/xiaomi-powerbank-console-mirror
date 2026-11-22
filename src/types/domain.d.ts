export type Qi2Mode = "enabled" | "experimental" | "unsupported_firmware" | "pending" | "none";
export type Qi2ProtocolId = "encrypted" | "legacy";

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

export interface HidTransport {
  kind: "webhid";
  info: { productName: string; vendorId: number; productId: number };
  open(): Promise<void>;
  close(): Promise<void>;
  send(frame: Uint8Array): Promise<void>;
  onInputReport(handler: (data: Uint8Array) => void): () => void;
  onDisconnect(handler: () => void): () => void;
}
