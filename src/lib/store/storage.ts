import { createJSONStorage, type StateStorage } from 'zustand/middleware';

/** localStorage con try/catch: modo privado de Safari, cuota llena o SSR no rompen la app. */
const safeLocalStorage: StateStorage = {
  getItem: (name) => {
    try {
      return typeof window === 'undefined' ? null : window.localStorage.getItem(name);
    } catch {
      return null;
    }
  },
  setItem: (name, value) => {
    try {
      window.localStorage.setItem(name, value);
    } catch {
      /* sin persistencia, la sesión sigue funcionando en memoria */
    }
  },
  removeItem: (name) => {
    try {
      window.localStorage.removeItem(name);
    } catch {
      /* noop */
    }
  },
};

export const safeStorage = createJSONStorage(() => safeLocalStorage);
