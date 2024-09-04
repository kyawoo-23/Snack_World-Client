import { Theme } from "daisyui";

export const APP_THEMES: Theme[] = ["black", "nord"];

export const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export enum COOKIE {
  TOKEN = "CUSTOMER_TOKEN",
}

export enum LOCAL_STORAGE {
  IS_SIDEBAR_COLLAPSED = "IS_SIDE_BAR_COLLAPSED",
  USER = "CUSTOMER",
  THEME = "THEME",
}

export enum DIALOG_TYPES {
  BUY_NOW = "BUY_NOW",
  CHECKOUT = "CHECKOUT",
}
