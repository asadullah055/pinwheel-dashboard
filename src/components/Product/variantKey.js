export const normalizeVariantValue = (value) =>
  String(value ?? "")
    .normalize("NFKC")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

export const getVariantKey = (values) =>
  values
    .map((value) => encodeURIComponent(normalizeVariantValue(value) || "value"))
    .join("|");

const getSkuPart = (value) =>
  String(value ?? "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\uFE0E\uFE0F\u200D]/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim()
    .toLowerCase();

export const getSafeSkuSuffix = (values) =>
  values
    .map((value) => getSkuPart(value).replace(/\s+/g, "-"))
    .filter(Boolean)
    .join("-");

export const findOriginalVariantValue = (values, normalizedValue) =>
  values.find(
    (value) =>
      getVariantKey([value]) === normalizedValue ||
      normalizeVariantValue(value) === normalizedValue
  );
