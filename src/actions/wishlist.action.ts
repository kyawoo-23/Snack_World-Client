"use server";

import { WishListProduct } from "@/prisma-types";
import { get, post, remove } from "@/utils/api";

export async function getWishList() {
  const res = await get<WishListProduct[]>("wishlist-product");
  return res;
}

export async function addWishlist(data: { productId: string }) {
  const res = await post<WishListProduct, { productId: string }>(
    "wishlist-product",
    data
  );
  return res;
}

export async function removeWishlist(productId: string) {
  const res = await remove<WishListProduct>(`wishlist-product/${productId}`);
  return res;
}
