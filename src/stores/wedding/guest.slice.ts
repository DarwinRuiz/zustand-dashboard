import { StateCreator } from "zustand";

export interface GuestSlice {
    guestCount: number;

    setGuestCount: (count: number) => void;
}


export const createGuestSlice: StateCreator<GuestSlice> = (set) => ({
    guestCount: 0,

    setGuestCount: (count: number) => set(state => {
        if (count < 0) return { ...state }
        return {
            ...state,
            guestCount: count,
        }
    }),
})