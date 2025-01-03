"use client";

import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { useAuthStore } from "@/store/auth-store";
import { COOKIE } from "@/utils/constants";
import { LOCAL_STORAGE } from "@/utils/constants";
import { removeLocalStorage } from "@/utils/shared/local-storage";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, removeUser } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!getCookie(COOKIE.TOKEN)) {
      // Remove user-related information
      removeUser();
      removeLocalStorage(LOCAL_STORAGE.USER);

      // If there is no token, redirect to the login page
      router.push("/login");
      return;
    } else if (user) {
      // If the user is logged in, redirect to the home page
      router.push("/");
      return;
    }
  }, [user, router, removeUser]);

  return (
    <div className='h-[80vh] rounded-3xl w-full bg-accent p-4 grid place-items-center'>
      {children}
    </div>
  );
}
