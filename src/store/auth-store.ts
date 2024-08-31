import { LOCAL_STORAGE } from "@/utils/constants/local-storage.type";
import { getLocalStorage } from "@/utils/shared/local-storage";
import { TUser } from "@/utils/shema/authSchema";
import { create } from "zustand";

type Store = {
  user: null | TUser;
  setUser: (user: TUser) => void;
  removeUser: () => void;
};

export const useAuthStore = create<Store>((set) => {
  let initialUser = null;
  try {
    const storedUser = getLocalStorage(LOCAL_STORAGE.USER);
    initialUser = storedUser ? JSON.parse(storedUser) : null;
  } catch {
    initialUser = null;
  }

  return {
    user: initialUser,
    setUser: (user) =>
      set({
        user: user,
      }),
    removeUser: () => set({ user: null }),
  };
});
