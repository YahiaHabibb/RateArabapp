import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { store } from "./store"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const calculateCartTotals = () => {
  const { cartProduct } = store()
  const totalAmt = cartProduct.reduce(
    (sum, product) => {
      const quantity = product?.quantity ?? 1;
      const regularPrice = product?.price * quantity;
      const discountPrice = product?.price * ((product?.discountPercentage || 0));
    
      sum.regular += regularPrice;
      sum.discounted += discountPrice;
      return sum;
    },
    { regular: 0, discounted: 0}
  );
  return { totalAmt };
};