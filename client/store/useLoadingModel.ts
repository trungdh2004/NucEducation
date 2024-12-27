import { create } from "zustand";

type PropUseLoading = {
  open: boolean;
  setOpen: () => void;
  setClose: () => void;
};

export const useLoadingModel = create<PropUseLoading>((set) => ({
  open: false,
  setOpen: () => set(() => ({ open: true })),
  setClose: () => set(() => ({ open: false })),
}));
