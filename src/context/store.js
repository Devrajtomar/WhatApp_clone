import { create } from "zustand";

export const state = create((set) => ({
  userEmail: "",
  setUserEmail: (value) =>
    set({
      userEmail: value,
    }),
  isOpen: true,
  setIsOpen: (value) => set(() => ({ isOpen: value })),
  addFriends: false,
  setAddFriends: (value) =>
    set(() => ({
      addFriends: value,
    })),
  currentChatUser: "",
  setUser: (value) => set(() => ({ currentChatUser: value })),
}));
