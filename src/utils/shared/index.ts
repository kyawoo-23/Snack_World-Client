import { Product } from "@/prisma-types";

export const getImageKey = (image: string): string => {
  return image.split("/").pop() as string;
};

export const getProductPrice = (
  product: {
    price: number;
    promotion: boolean;
    promotionPrice?: number;
  },
  quantity: number
): number => {
  return (
    (product.promotion
      ? product.promotionPrice || product.price
      : product.price) * quantity
  );
};
