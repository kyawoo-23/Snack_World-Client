"use server";

import { Product } from "@/prisma-types";
import { get } from "@/utils/api";
import { COOKIE } from "@/utils/constants/cookie.type";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

export async function getProducts(index: number = 0) {
  const token = getCookie(COOKIE.TOKEN, {
    cookies,
  });
  if (token) {
    const res = await get<Product[]>(`product/public/${index}?token=${token}`);
    return res;
  }

  const res = await get<Product[]>(`product/public/${index}`);
  return res;
}

export async function getProductDetails(id: string) {
  const res = await get<Product>(`product/${id}`);
  return res;
}
