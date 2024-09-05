import { format } from "date-fns";

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

export function generateOrderCode() {
  const now = new Date();
  const pad = (num: number): string => String(num).padStart(2, "0");

  const dateTime = [
    now.getFullYear(),
    pad(now.getMonth() + 1),
    pad(now.getDate()),
    pad(now.getHours()),
    pad(now.getMinutes()),
    pad(now.getSeconds()),
  ].join("");

  const milliseconds = now.getMilliseconds();

  return `ORD-${dateTime}-${milliseconds}`;
}

export function getLocalizedDate(date: Date): string {
  return format(date, "PPP");
}

export function getLocalizedTime(date: Date): string {
  return format(date, "hh:mm:ss a");
}
