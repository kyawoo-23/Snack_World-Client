"use client";

import { APP_THEMES } from "@/utils/constants";
import { LOCAL_STORAGE } from "@/utils/constants/local-storage.type";
import { getLocalStorage, setLocalStorage } from "@/utils/shared/local-storage";
import { Theme } from "daisyui";
import { Moon, ShoppingCart, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
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

  return (
    <div className='navbar text-accent-content bg-accent sticky top-0 glass z-50 mb-8 shadow-lg'>
      <div className='max-w-7xl w-full mx-auto'>
        <div className='flex-1'>
          <Link href={"/"} className='text-xl'>
            <div className='size-14 relative'>
              <Image
                src='/assets/logo/SNACK_WORLD_DARK.png'
                alt='logo'
                fill
                priority
              />
            </div>
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
                    src='https://api.dicebear.com/9.x/fun-emoji/svg?seed=Felix'
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
                <a className='justify-between'>Profile</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
