import { create } from "zustand";

interface UserInterface {
  isAdmin: boolean;
  setAdmin: (adminStatus: boolean) => void;
}

export const userStore = create<UserInterface>((set) => ({
  isAdmin: true,
  setAdmin: (adminStatus: boolean) => set(() => ({ isAdmin: adminStatus })),
}));
