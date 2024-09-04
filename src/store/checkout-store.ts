import { TCheckOutProduct } from "@/utils/shema/checkOutSchema";
import { create } from "zustand";

type Store = {
  totalPrice: number;
  setTotalPrice: (total: number) => void;
  products: TCheckOutProduct[];
  setProducts: (products: TCheckOutProduct[]) => void;
};

export const useCheckOutStore = create<Store>((set) => ({
  totalPrice: 0,
  setTotalPrice: (total) => set({ totalPrice: total }),
  products: [],
  setProducts: (products) => set((state) => ({ products })),
}));
