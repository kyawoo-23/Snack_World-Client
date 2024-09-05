"use server";

import { CustomerOrder } from "@/prisma-types";
import { get, patch, post, remove } from "@/utils/api";
import { TCheckOutRequest } from "@/utils/shema/checkOutSchema";

export async function checkOut(request: TCheckOutRequest) {
  const res = await post<CustomerOrder, TCheckOutRequest>(
    "customer-order",
    request
  );
  return res;
}

export async function getCustomerOrders() {
  const res = await get<CustomerOrder[]>("customer-order/user");
  return res;
}