// createProductHelpers.js
export function cartesian(arr) {
  if (arr.length === 0) return [];
  return arr.reduce((a, b) => a.flatMap((d) => b.map((e) => [...d, e])), [[]]);
}

export function getGroupedRows(attributes) {
  if (attributes.length === 0) return [];
  if (attributes.length === 1) {
    return attributes[0].values.map((v) => [v]);
  }
  const [firstAttr, ...restAttrs] = attributes;
  const restCombinations = cartesian(
    restAttrs.map((attr) => (attr.values.length ? attr.values : [""]))
  );
  let rows = [];
  firstAttr.values.forEach((val) => {
    restCombinations.forEach((comb) => {
      rows.push([val, ...comb]);
    });
  });
  return rows;
}

export function validatePrice(price, discountPrice) {
  if (!price || !discountPrice) return true;
  return parseFloat(price) > parseFloat(discountPrice);
}