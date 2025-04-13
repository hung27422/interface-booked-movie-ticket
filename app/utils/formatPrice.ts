// utils/formatPrice.ts
export const formatPrice = (price: number): string => {
  if (price >= 1000) {
    return `${price / 1000}K`;
  }
  return `${price}`;
};
