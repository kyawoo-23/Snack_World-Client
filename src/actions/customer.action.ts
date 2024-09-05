"use server";

import { Customer } from "@/prisma-types";
import { get, patch, post } from "@/utils/api";
import {
  TLoginCustomerSchema,
  TLoginResponse,
  TRegisterCustomerSchema,
} from "@/utils/shema/authSchema";
import { TProfileSchema } from "@/utils/shema/profileSchema";

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

export async function getProfile() {
  const res = await get<Customer>("customer/profile");
  return res;
}

export async function updateProfile(data: TProfileSchema) {
  const res = await patch<Customer, TProfileSchema>("customer", data);
  return res;
}
