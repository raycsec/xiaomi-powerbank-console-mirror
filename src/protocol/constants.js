export const FRAME_HEAD = 0xa5;
export const MAX_HID_FRAME_SIZE = 64;
export const REPORT_ID = 0;

export const HID_FILTERS = [{ vendorId: 0x2717 }, { vendorId: 0x1a86 }];

export const CMD = {
  HELLO: 0x00,
  GET_BATTERY_INFO: 0x01,
  GET_CELL_STATUS: 0x02,
  GET_HISTORY: 0x03,
  GET_BATTERY_ID: 0x04,
  DISCONNECT: 0x05,
  SET_QI2_LEGACY: 0x06,
  GET_QI2_STATUS: 0x07,
  GET_CELL_TEMP_MODEL: 0x08,
  HEARTBEAT: 0x0a,
  SET_QI2_ENCRYPTED: 0xe6,
};

export const RESP = {
  HELLO: 0x10,
  BATTERY_INFO: 0x11,
  CELL_STATUS: 0x12,
  HISTORY: 0x13,
  BATTERY_ID: 0x14,
  SET_QI2_LEGACY: 0x16,
  QI2_STATUS: 0x17,
  CELL_TEMP_MODEL: 0x18,
  SET_QI2_ENCRYPTED: 0xf6,
  ECHO: 0xfe,
};

export const TIMEOUT_MS = {
  HELLO: 2500,
  COMMAND: 3500,
  BATTERY_ID: 1800,
  HISTORY: 2500,
  QI2_LEGACY_WRITE: 5000,
  QI2_ENCRYPTED_WRITE: 6000,
  QI2_READBACK_INTERVAL: 700,
  QI2_READBACK_RETRIES: 6,
  HEARTBEAT_INTERVAL: 15000,
};

export const FAULT_KEYS = {
  0: "fault_normal",
  1: "fault_overvoltage",
  2: "fault_undervoltage",
  3: "fault_discharge_high_temp",
  4: "fault_discharge_low_temp",
  5: "fault_charge_high_temp",
  6: "fault_charge_low_temp",
  7: "fault_short_circuit",
  8: "fault_mos",
  9: "fault_afe",
};

export const HISTORY_FAULT_NAMES = {
  0: "正常",
  1: "过压",
  2: "欠压",
  3: "高温",
  4: "欠温",
  5: "过流",
  6: "短路",
  7: "压差",
};

export const HISTORY_STATE_NAMES = {
  0: "放电",
  64: "充电",
  128: "待机",
};

export const CHARGE_STATE_KEYS = {
  0: "status_idle",
  1: "status_charging",
  2: "status_discharging",
  3: "status_unknown",
};
