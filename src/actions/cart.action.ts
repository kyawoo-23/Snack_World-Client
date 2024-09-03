"use server";

import { TCartProductRequest } from "@/models/cart.model";
import { CartProduct } from "@/prisma-types";
import { get, patch, post, remove } from "@/utils/api";

export async function addProductToCart(cartProduct: TCartProductRequest) {
  const res = await post<CartProduct, TCartProductRequest>(
    "cart-product",
    cartProduct
  );
  return res;
}

export async function getCartList() {
  const res = await get<CartProduct[]>("cart-product");
  return res;
}

export async function getCartCount() {
  const res = await get<number>("cart-product/count");
  return res;
}

export async function removeProductFromCart(id: string) {
  const res = await remove<CartProduct>(`cart-product/${id}`);
  return res;
}

export async function removeAllProductsFromCart() {
  const res = await remove<CartProduct[]>("cart-product/remove-all");
  return res;
}

export async function updateProductQuantity(id: string, quantity: number) {
  const res = await patch<CartProduct, { quantity: number }>(
    `cart-product/${id}`,
    { quantity }
  );
  return res;
}
