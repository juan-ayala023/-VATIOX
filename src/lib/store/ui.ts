'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LAUNCH_MODE, type LaunchMode } from '@/lib/config';
import { safeStorage } from './storage';

type UIState = {
  cartOpen: boolean;
  menuOpen: boolean;
  waitlistOpen: boolean;
  buyBarVisible: boolean;
  setCartOpen: (v: boolean) => void;
  setMenuOpen: (v: boolean) => void;
  setWaitlistOpen: (v: boolean) => void;
  setBuyBarVisible: (v: boolean) => void;
};

export const useUI = create<UIState>()((set) => ({
  cartOpen: false,
  menuOpen: false,
  waitlistOpen: false,
  buyBarVisible: false,
  setCartOpen: (cartOpen) => set({ cartOpen }),
  setMenuOpen: (menuOpen) => set({ menuOpen }),
  setWaitlistOpen: (waitlistOpen) => set({ waitlistOpen }),
  setBuyBarVisible: (buyBarVisible) => set({ buyBarVisible }),
}));

type LaunchState = {
  /** Override solo para desarrollo (toggle de presentación). En producción manda LAUNCH_MODE. */
  devOverride: LaunchMode | null;
  setDevOverride: (m: LaunchMode | null) => void;
};

export const useLaunchStore = create<LaunchState>()(
  persist(
    (set) => ({
      devOverride: null,
      setDevOverride: (devOverride) => set({ devOverride }),
    }),
    { name: 'vatiox-launch-mode', storage: safeStorage, skipHydration: true },
  ),
);

export function useLaunchMode(): LaunchMode {
  const override = useLaunchStore((s) => s.devOverride);
  if (process.env.NODE_ENV === 'development' && override) return override;
  return LAUNCH_MODE;
}
