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
  Requests: false,
  setRequests: (value) =>
    set(() => ({
      Requests: value,
    })),
  addFriends: false,
  setAddFriends: (value) =>
    set(() => ({
      addFriends: value,
    })),
  currentChatUser: "",
  setChatUser: (value) => set(() => ({ currentChatUser: value })),
  currentStoryUser: "",
  setStoryUser: (value) => set(() => ({ currentStoryUser: value })),
}));

export const modal = create((set) => ({
  image: false,
  setImage: (value) => set({ image: value }),
  Account: false,
  setAccount: (value) => set({ Account: value }),
  ChatSetting: false,
  setChatSetting: (value) => set({ ChatSetting: value }),
  userSettings: false,
  setUserSetting: (value) => set({ userSettings: value }),
  NewGroup: false,
  setNewGroup: (value) => set({ NewGroup: value }),
  NewStory: false,
  setNewStory: (value) => set({ NewStory: value }),
}));
