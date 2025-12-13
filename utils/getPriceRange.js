/* export function getPriceRange(product) {
    // যদি variants থাকে
    console.log("product", product);
    
    if (product?.variants && product?.variants.length > 0) {
        const prices = product?.variants.map(v => v.price);
        return {
            minPrice: Math.min(...prices),
            maxPrice: Math.max(...prices)
        };
    }

    // যদি variants না থাকে → regularPrice রিটার্ন
    return {
        minPrice: product?.regularPrice,
        maxPrice: product?.regularPrice
    };
} */

 /*    export function getPriceRange(product) {
  // If product has variants
  if (product?.variants && product?.variants.length > 0) {
    const prices = product?.variants.map(v => {
      // priority: discountPrice → regularPrice
      if (v.discountPrice && !isNaN(v.discountPrice)) return v.discountPrice;
      if (v.price && !isNaN(v.price)) return v.price;
      return null;
    }).filter(p => p !== null);

    return {
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices)
    };
  }

  // If NO variants available
  const regular = Number(product?.regularPrice) || null;
  const discount = Number(product?.discountPrice) || null;

  return {
    minPrice: discount ?? regular,
    maxPrice: regular
  };
} */

export const getPriceRange = (product) => {
  if (!product?.variants || product.variants.length === 0) {
    return null;
  }

  const prices = product.variants.map((v) =>
    v.discountPrice ? v.discountPrice : v.price
  );

  const min = Math.min(...prices);
  const max = Math.max(...prices);

  return { min, max };
};
