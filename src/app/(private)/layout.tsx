"use client";

import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [user, router]);

  if (loading) {
    return (
      <div className='h-[90vh] w-full grid place-content-center'>
        <span className='loading loading-ring loading-lg'></span>
      </div>
    );
  }

  return <>{children}</>;
}
