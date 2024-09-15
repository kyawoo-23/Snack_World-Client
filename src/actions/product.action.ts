"use server";

import { Product } from "@/prisma-types";
import { get } from "@/utils/api";

export async function getProducts(index: number = 0) {
  const res = await get<Product[]>(`product/public/${index}`);

  return {
    data: res,
    nextCursor: res.data.length < 4 ? undefined : index + 1,
  };
}

export async function getProductDetails(id: string) {
  const res = await get<Product>(`product/${id}`);
  return res;
}
