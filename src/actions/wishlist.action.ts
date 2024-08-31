"use server";

import { WishListProduct } from "@/prisma-types";
import { post } from "@/utils/api";

export async function addWishlist(data: { productId: string }) {
  const res = await post<WishListProduct, { productId: string }>(
    "wishlist-product",
    data
  );
  return res;
}
