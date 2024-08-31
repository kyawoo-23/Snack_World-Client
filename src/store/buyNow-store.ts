import { ProductVariant } from "@/prisma-types";
import { create } from "zustand";

type Store = {
  product: {
    id: string;
    name: string;
    variants: ProductVariant[];
    price: number;
  };
  setProduct: (product: Store["product"]) => void;
};

export const useBuyNowStore = create<Store>((set) => ({
  product: {
    id: "",
    name: "",
    variants: [],
    price: 0,
  },
  setProduct: (product) => set({ product }),
}));
