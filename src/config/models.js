export const DEFAULT_TEMP_RANGE = "-20℃~60℃";

export const POWER_BANK_MODELS = [
  {
    id: 9,
    model: "WPB1025S",
    name: "小米金沙江充电宝 超薄磁吸 10000 45W",
    nameEn: "Xiaomi UltraThin Magnetic Power Bank 10000 25W",
    connection: "C1",
    tempRange: DEFAULT_TEMP_RANGE,
    capabilities: {
      qi2: { mode: "enabled", protocols: ["legacy", "encrypted"], allowDisable: true },
      supportsTempModelQuery: false,
      historyMinTimestamp: 0,
    },
    display: { showInModelList: true, showSerialNumber: true, showCellSerialNumber: true, maxTemperatureSensors: null },
  },
  {
    id: 19,
    model: "WPB1025S",
    name: "小米金沙江充电宝 超薄磁吸 10000 45W",
    nameEn: "Xiaomi UltraThin Magnetic Power Bank 10000 25W",
    connection: "C1",
    tempRange: DEFAULT_TEMP_RANGE,
    capabilities: {
      qi2: { mode: "enabled", protocols: ["legacy", "encrypted"], allowDisable: true },
      supportsTempModelQuery: true,
      historyMinTimestamp: 0,
    },
    display: { showInModelList: true, showSerialNumber: true, showCellSerialNumber: true, maxTemperatureSensors: null },
  },
  {
    id: 16,
    model: "WPB1026S",
    name: "小米金沙江充电宝 超薄磁吸 10000 45W",
    nameEn: "Xiaomi UltraThin Magnetic Power Bank 10000 25W",
    connection: "C1",
    tempRange: DEFAULT_TEMP_RANGE,
    capabilities: {
      qi2: { mode: "enabled", protocols: ["encrypted", "legacy"], allowDisable: true },
      supportsTempModelQuery: true,
      historyMinTimestamp: 0,
    },
    display: { showInModelList: true, showSerialNumber: true, showCellSerialNumber: true, maxTemperatureSensors: null },
  },
  {
    id: 10,
    model: "WPB0525S",
    name: "小米金沙江充电宝 超薄磁吸 5000 27W",
    nameEn: "Xiaomi UltraThin Magnetic Power Bank 5000 25W",
    connection: "C1",
    tempRange: DEFAULT_TEMP_RANGE,
    capabilities: {
      qi2: { mode: "unsupported_firmware", protocols: [], allowDisable: false },
      supportsTempModelQuery: false,
      historyMinTimestamp: 0,
    },
    display: { showInModelList: true, showSerialNumber: true, showCellSerialNumber: true, maxTemperatureSensors: null },
  },
  {
    id: 11,
    model: "WPB1007ZX",
    name: "小米充电宝 磁吸支架 10000 7.5W 2026版",
    nameEn: "Xiaomi Magnetic Power Bank 10000 with Built-in Stand 2026",
    connection: "C2",
    tempRange: DEFAULT_TEMP_RANGE,
    capabilities: {
      qi2: { mode: "none", protocols: [], allowDisable: false },
      supportsTempModelQuery: false,
      historyMinTimestamp: 1772323200,
    },
    display: { showInModelList: true, showSerialNumber: false, showCellSerialNumber: false, maxTemperatureSensors: 1 },
  },
  {
    id: 12,
    model: "WPB1025",
    name: "小米充电宝 磁吸自带线 10000 45W",
    nameEn: "Xiaomi Magnetic Power Bank 10000 25W (Integrated Cable) 2027",
    connection: "C2",
    tempRange: DEFAULT_TEMP_RANGE,
    capabilities: {
      qi2: { mode: "experimental", protocols: ["encrypted", "legacy"], allowDisable: true },
      supportsTempModelQuery: false,
      historyMinTimestamp: 0,
    },
    display: { showInModelList: true, showSerialNumber: true, showCellSerialNumber: true, maxTemperatureSensors: null },
  },
  {
    id: 3,
    model: "PB2045MI",
    name: "小米充电宝 自带线 20000 45W",
    nameEn: "Xiaomi Power Bank 20000 45W Boost (Integrated Cable)",
    connection: "C2",
    tempRange: DEFAULT_TEMP_RANGE,
    capabilities: { qi2: { mode: "none", protocols: [], allowDisable: false }, supportsTempModelQuery: false, historyMinTimestamp: 0 },
    display: { showInModelList: true, showSerialNumber: true, showCellSerialNumber: true, maxTemperatureSensors: null },
  },
  {
    id: 5,
    model: "PB2067MI",
    name: "小米充电宝 自带线 20000 67W",
    nameEn: "Xiaomi 67W Power Bank 20000 (Integrated Cable)",
    connection: "C2",
    tempRange: DEFAULT_TEMP_RANGE,
    capabilities: { qi2: { mode: "none", protocols: [], allowDisable: false }, supportsTempModelQuery: false, historyMinTimestamp: 0 },
    display: { showInModelList: true, showSerialNumber: true, showCellSerialNumber: true, maxTemperatureSensors: null },
  },
  {
    id: 18,
    model: "PB2021",
    name: "小米充电宝 自带线 20000 22.5W",
    nameEn: "Xiaomi Power Bank 20000 (Integrated Cable) 2027",
    connection: "C2",
    tempRange: DEFAULT_TEMP_RANGE,
    capabilities: { qi2: { mode: "none", protocols: [], allowDisable: false }, supportsTempModelQuery: true, historyMinTimestamp: 0 },
    display: { showInModelList: true, showSerialNumber: true, showCellSerialNumber: true, maxTemperatureSensors: null },
  },
  {
    id: 14,
    model: "PB2020",
    name: "小米自带线充电宝 20000 22.5W 2026",
    nameEn: "Xiaomi Power Bank 20000 (Integrated Cable)",
    connection: "C2",
    tempRange: DEFAULT_TEMP_RANGE,
    capabilities: { qi2: { mode: "none", protocols: [], allowDisable: false }, supportsTempModelQuery: false, historyMinTimestamp: 0 },
    display: { showInModelList: true, showSerialNumber: true, showCellSerialNumber: true, maxTemperatureSensors: null },
  },
  {
    id: 13,
    model: "P15",
    name: "小米自带线充电宝 10000 口袋版 2026",
    nameEn: "Xiaomi Power Bank 10000 (Integrated Cable)",
    connection: "C2",
    tempRange: DEFAULT_TEMP_RANGE,
    capabilities: { qi2: { mode: "none", protocols: [], allowDisable: false }, supportsTempModelQuery: false, historyMinTimestamp: 0 },
    display: { showInModelList: true, showSerialNumber: true, showCellSerialNumber: true, maxTemperatureSensors: null },
  },
  {
    id: 17,
    model: "P17",
    name: "小米自带线充电宝 10000 口袋版",
    nameEn: "Xiaomi Power Bank 10000 (Integrated Cable) 2027",
    connection: "C2",
    tempRange: DEFAULT_TEMP_RANGE,
    capabilities: { qi2: { mode: "none", protocols: [], allowDisable: false }, supportsTempModelQuery: true, historyMinTimestamp: 0 },
    display: { showInModelList: true, showSerialNumber: true, showCellSerialNumber: true, maxTemperatureSensors: null },
  },
  {
    id: 1,
    model: "PB1067MI",
    name: "小米自带线充电宝 10000 67W",
    nameEn: "Xiaomi 67W Power Bank 10000 (Integrated Cable)",
    connection: "C2",
    tempRange: DEFAULT_TEMP_RANGE,
    capabilities: { qi2: { mode: "none", protocols: [], allowDisable: false }, supportsTempModelQuery: false, historyMinTimestamp: 0 },
    display: { showInModelList: true, showSerialNumber: true, showCellSerialNumber: true, maxTemperatureSensors: null },
  },
  {
    id: 7,
    model: "NPB1055R",
    name: "小米充电宝 伸缩线 10000 55W",
    nameEn: "Xiaomi Power Bank 10000 55W (Retractable Cable)",
    connection: "C2",
    tempRange: DEFAULT_TEMP_RANGE,
    capabilities: { qi2: { mode: "none", protocols: [], allowDisable: false }, supportsTempModelQuery: false, historyMinTimestamp: 0 },
    display: { showInModelList: true, showSerialNumber: true, showCellSerialNumber: true, maxTemperatureSensors: null },
  },
  {
    id: 2,
    model: "P15",
    name: "小米自带线充电宝 10000 口袋版",
    nameEn: "Xiaomi Power Bank 10000 (Integrated Cable)",
    connection: "C2",
    tempRange: DEFAULT_TEMP_RANGE,
    capabilities: { qi2: { mode: "none", protocols: [], allowDisable: false }, supportsTempModelQuery: false, historyMinTimestamp: 0 },
    display: { showInModelList: true, showSerialNumber: true, showCellSerialNumber: true, maxTemperatureSensors: null },
  },
  {
    id: 4,
    model: "PB2020",
    name: "小米自带线充电宝 20000 22.5W",
    nameEn: "Xiaomi Power Bank 20000 22.5W (Integrated Cable)",
    connection: "C2",
    tempRange: DEFAULT_TEMP_RANGE,
    capabilities: { qi2: { mode: "none", protocols: [], allowDisable: false }, supportsTempModelQuery: false, historyMinTimestamp: 0 },
    display: { showInModelList: true, showSerialNumber: true, showCellSerialNumber: true, maxTemperatureSensors: null },
  },
  {
    id: 6,
    model: "P25",
    name: "小米充电宝 Pro 25000 250W",
    nameEn: "Xiaomi Power Bank Pro 25000 250W",
    connection: "C2",
    tempRange: "-20℃~70℃",
    capabilities: { qi2: { mode: "none", protocols: [], allowDisable: false }, supportsTempModelQuery: false, historyMinTimestamp: 0 },
    display: { showInModelList: true, showSerialNumber: true, showCellSerialNumber: true, maxTemperatureSensors: null },
  },
  {
    id: 8,
    model: "AC1067",
    name: "小米充电宝 三合一 10000 67W",
    nameEn: "Xiaomi 3-in-1 Power Bank 10000 67W",
    connection: "C2",
    tempRange: DEFAULT_TEMP_RANGE,
    capabilities: { qi2: { mode: "none", protocols: [], allowDisable: false }, supportsTempModelQuery: false, historyMinTimestamp: 0 },
    display: { showInModelList: true, showSerialNumber: true, showCellSerialNumber: true, maxTemperatureSensors: null },
  },
];

export function createUnknownModelConfig(modelId, modelCode = "") {
  const code = modelCode || (modelId != null ? `ID_${modelId}` : "UNKNOWN");
  return {
    id: modelId ?? null,
    model: code,
    name: modelId != null ? `小米充电宝（型号 ${modelId}）` : "小米充电宝",
    nameEn: modelId != null ? `Xiaomi Power Bank (Model ${modelId})` : "Xiaomi Power Bank",
    connection: "--",
    tempRange: DEFAULT_TEMP_RANGE,
    isUnknown: true,
    capabilities: {
      qi2: { mode: "experimental", protocols: ["encrypted", "legacy"], allowDisable: true },
      supportsTempModelQuery: (modelId ?? 0) > 14,
      historyMinTimestamp: 0,
    },
    display: { showInModelList: false, showSerialNumber: true, showCellSerialNumber: true, maxTemperatureSensors: null },
  };
}

export function findModelById(id) {
  let numId = null;
  if (typeof id === "string") {
    const parsed = parseInt(id.replace(/^0x/i, ""), 16);
    numId = Number.isNaN(parsed) ? null : parsed;
  } else if (typeof id === "number" && Number.isInteger(id)) {
    numId = id;
  }
  if (numId === null) return null;
  return POWER_BANK_MODELS.find((m) => m.id === numId) || null;
}

export function findModelByCode(modelCode) {
  if (typeof modelCode !== "string" || !modelCode) return null;
  return POWER_BANK_MODELS.find((m) => m.model === modelCode) || null;
}

export function resolveModelConfig(modelId, modelCode = "") {
  return findModelById(modelId) || findModelByCode(modelCode) || createUnknownModelConfig(modelId, modelCode);
}

export function getVisibleModels() {
  return POWER_BANK_MODELS.filter((m) => m.display.showInModelList);
}

export function getQi2ModelGroups() {
  const seen = new Set();
  const dedup = (predicate) =>
    POWER_BANK_MODELS.filter((m) => {
      if (!predicate(m) || seen.has(m.model)) return false;
      seen.add(m.model);
      return true;
    });
  return {
    supported: dedup((m) => m.capabilities.qi2.mode === "enabled"),
    experimental: dedup((m) => m.capabilities.qi2.mode === "experimental"),
    unsupportedFirmware: dedup((m) => m.capabilities.qi2.mode === "unsupported_firmware"),
  };
}
