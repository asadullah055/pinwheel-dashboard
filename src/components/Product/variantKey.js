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

const getVariantFields = (variant = {}) => ({
  sku: variant.sku || "",
  price: variant.price || "",
  discountPrice: variant.discountPrice || "",
  discountStartDate: variant.discountStartDate || "",
  discountEndDate: variant.discountEndDate || "",
  stock: variant.stock || "",
  availability: variant.availability !== false,
});

const cartesian = (arr) => {
  if (arr.length === 0) return [];
  return arr.reduce((a, b) => a.flatMap((d) => b.map((e) => [...d, e])), [[]]);
};

export const getCurrentVariantRows = (attributes = []) => {
  if (attributes.length === 0) return [];
  if (attributes.length === 1) {
    return attributes[0].values.map((value) => [value]);
  }

  const [firstAttr, ...restAttrs] = attributes;
  const restCombinations = cartesian(
    restAttrs.map((attr) => (attr.values.length ? attr.values : [""]))
  );

  return firstAttr.values.flatMap((value) =>
    restCombinations.map((combination) => [value, ...combination])
  );
};

export const buildVariantsFromCurrentRows = (attributes = [], variantData = {}) => {
  const rows = getCurrentVariantRows(attributes);

  if (rows.length === 0) {
    return [getVariantFields(variantData.single)];
  }

  return rows.map((row) => {
    const variant = variantData[getVariantKey(row)] || {};
    const variantObj = getVariantFields(variant);

    attributes.forEach((attr, index) => {
      const value = row[index];
      if (attr.name && value) {
        variantObj[attr.name] = value;
      }
    });

    return variantObj;
  });
};
