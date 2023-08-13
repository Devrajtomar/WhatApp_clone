import { create } from "zustand";

export const state = create((set) => ({
  user: "",
  setUser: (value) =>
    set({
      user: value,
    }),
  isOpen: true,
  setIsOpen: (value) => set(() => ({ isOpen: value })),
  Friends: false,
  setFriends: (value) =>
    set(() => ({
      Friends: value,
    })),
  addFriends: false,
  setAddFriends: (value) =>
    set(() => ({
      addFriends: value,
    })),
  currentChatUser: "",
  setChatUser: (value) => set(() => ({ currentChatUser: value })),
}));
