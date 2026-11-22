import {
  BATTERY_CHEMISTRY_MAP,
  DAY_CODE_MAP,
  ENTERPRISE_NAMES_EN,
  ENTERPRISE_NAMES_ZH,
  MI_CELL_MODEL_MAP,
  MONTH_CODE_MAP,
  PRODUCT_TYPE_MAP,
  YEAR_CODE_MAP,
} from "../data/batteryIdMaps.js";

export function parseBatteryIdString(rawId) {
  if (!rawId || typeof rawId !== "string") return null;
  const cleaned = rawId.replace(/\s+/g, "");
  if (cleaned.length < 9) return null;

  const fixedPart = cleaned.slice(0, 9);
  let rest = cleaned.slice(9);
  let ladderCode = "";
  if (rest.startsWith("-R-")) {
    ladderCode = "-R";
    rest = rest.slice(3);
  } else if (rest.startsWith("R-")) {
    ladderCode = "-R";
    rest = rest.slice(2);
  }

  const enterpriseCode = fixedPart.slice(0, 4);
  const productTypeCode = fixedPart[4];
  const chemistryCode = fixedPart[5];
  const year = YEAR_CODE_MAP[fixedPart[6]] ?? null;
  const month = MONTH_CODE_MAP[fixedPart[7]] ?? null;
  const day = DAY_CODE_MAP[fixedPart[8]] ?? null;
  const productionDate =
    year && month && day
      ? `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`
      : "--";

  const miCode = rest.length >= 5 ? rest.slice(2, 5) : "";
  const compositeKey = `${enterpriseCode}${miCode}`;
  const miCodeInfo = MI_CELL_MODEL_MAP[compositeKey] || {
    project: "--",
    supplier: "--",
    cellModel: "--",
  };

  return {
    raw: rawId,
    fixed: {
      enterpriseCode,
      assemblyFactory: ENTERPRISE_NAMES_ZH[enterpriseCode] || "--",
      assemblyFactoryEn: ENTERPRISE_NAMES_EN[enterpriseCode] || "--",
      productType: PRODUCT_TYPE_MAP[productTypeCode] || "--",
      batteryType: BATTERY_CHEMISTRY_MAP[chemistryCode] || "--",
      productionDate,
    },
    ladderCode: ladderCode || "--",
    miCode,
    compositeKey,
    miCodeInfo,
  };
}
