"use server";

import { post } from "@/utils/api";
import {
  TLoginCustomerSchema,
  TLoginResponse,
  TRegisterCustomerSchema,
} from "@/utils/shema/authSchema";

export async function registerCustomer(data: TRegisterCustomerSchema) {
  const res = await post<TLoginResponse, TRegisterCustomerSchema>(
    "customer",
    data
  );
  return res;
}

export async function loginCustomer(data: TLoginCustomerSchema) {
  const res = await post<TLoginResponse, TLoginCustomerSchema>(
    "customer/login",
    data
  );
  return res;
}
