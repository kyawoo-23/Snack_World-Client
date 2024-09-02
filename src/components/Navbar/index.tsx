"use client";

import { useAuthStore } from "@/store/auth-store";
import { APP_THEMES } from "@/utils/constants";
import { COOKIE } from "@/utils/constants/cookie.type";
import { LOCAL_STORAGE } from "@/utils/constants/local-storage.type";
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from "@/utils/shared/local-storage";
import { deleteCookie } from "cookies-next";
import { Theme } from "daisyui";
import { Heart, Moon, ShoppingCart, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Navbar() {
  const [isClient, setIsClient] = useState(false);
  const { user, removeUser } = useAuthStore();
  const router = useRouter();

  const [theme, setTheme] = useState<Theme>(
    (getLocalStorage(LOCAL_STORAGE.THEME) as Theme) || APP_THEMES[0]
  );

  const toggleTheme = () => {
    const newTheme = theme === APP_THEMES[0] ? APP_THEMES[1] : APP_THEMES[0];
    setLocalStorage(LOCAL_STORAGE.THEME, newTheme);
    setTheme(newTheme);
  };

  useEffect(() => {
    document.querySelector("html")?.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className='navbar text-accent-content bg-accent sticky top-0 glass z-50 mb-8 shadow-lg'>
      <div className='max-w-5xl w-full mx-auto flex justify-between'>
        <div className='flex '>
          <Link href={"/"} className='size-14 relative'>
            <Image
              src='/assets/logo/SNACK_WORLD_DARK.png'
              alt='logo'
              fill
              priority
            />
          </Link>
        </div>
        <div className='flex items-center gap-2'>
          <label className='swap swap-rotate btn btn-ghost btn-circle'>
            <input
              type='checkbox'
              className='theme-controller'
              onChange={toggleTheme}
            />

            <Sun className='swap-off size-6 fill-current' />

            <Moon className='swap-on size-6 fill-current' />
          </label>

          {isClient && user ? (
            <>
              <Link href='/wishlist' className='btn btn-ghost btn-circle'>
                <div className='indicator'>
                  <Heart />
                </div>
              </Link>
              <div className='dropdown dropdown-end'>
                <div
                  tabIndex={0}
                  role='button'
                  className='btn btn-ghost btn-circle'
                >
                  <div className='indicator'>
                    <ShoppingCart />
                    <span className='badge badge-sm indicator-item'>8</span>
                  </div>
                </div>
                <div
                  tabIndex={0}
                  className='card card-compact dropdown-content bg-base-300 z-[1] mt-3 w-52 text-base-content shadow-lg'
                >
                  <div className='card-body'>
                    <span className='text-lg font-bold'>8 Items</span>
                    <span className='text-base'>Subtotal: $999</span>
                    <div className='card-actions'>
                      <button className='btn btn-primary btn-block'>
                        View cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className='dropdown dropdown-end'>
                <div
                  tabIndex={0}
                  role='button'
                  className='btn btn-ghost btn-circle avatar'
                >
                  <div className='avatar'>
                    <div className='mask mask-squircle w-10'>
                      <img
                        src={`https://api.dicebear.com/9.x/fun-emoji/svg?seed=${user.name}`}
                        className='object-cover'
                      />
                    </div>
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className='menu menu-sm dropdown-content bg-base-300 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg text-base-content'
                >
                  <li>
                    <Link href='profile' className='justify-between'>
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        deleteCookie(COOKIE.TOKEN);
                        removeLocalStorage(LOCAL_STORAGE.USER);
                        removeUser();
                        toast.success("Logout successfully");
                        router.push("/auth/login");
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <Link href='/auth/login' className='btn btn-sm'>
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
