"use client";

import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user } = useAuthStore();

  if (!user) {
    router.push("/auth/login");
    return;
  }

  return <>{children}</>;
}
