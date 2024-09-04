import axios, { AxiosError, AxiosResponse } from "axios";
import { COOKIE } from "@/utils/constants";
import { deleteCookie, getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Create an instance of Axios with default configuration
export const axiosAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosAPI.interceptors.request.use(
  (config) => {
    const accessToken = getCookie(COOKIE.TOKEN, { cookies });
    config.headers["Authorization"] = `Bearer ${accessToken}`;

    // console.log("Config: ", config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosAPI.interceptors.response.use(
  (response: AxiosResponse) => {
    // console.log("Success:", response);
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      deleteCookie(COOKIE.TOKEN, { cookies });
      redirect("/login");
      throw new Error("Unauthorized, Please logout and login again.");
    }

    return Promise.reject(error);
  }
);
