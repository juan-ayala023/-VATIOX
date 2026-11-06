/**
 * "Base de datos" del boceto en localStorage. Solo para el mock.
 * Se elimina cuando los adapters se conecten a servicios reales.
 */
import type { Order, WaitlistEntry } from './types';

const ORDERS_KEY = 'vatiox-mock-orders';
const WAITLIST_KEY = 'vatiox-mock-waitlist';

function read<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* noop */
  }
}

export const mockDb = {
  nextOrderId(): string {
    const orders = read<Order[]>(ORDERS_KEY, []);
    return `VX-${String(orders.length + 1).padStart(4, '0')}`;
  },
  saveOrder(order: Order): void {
    const orders = read<Order[]>(ORDERS_KEY, []);
    write(ORDERS_KEY, [...orders.filter((o) => o.id !== order.id), order]);
  },
  getOrder(id: string): Order | undefined {
    return read<Order[]>(ORDERS_KEY, []).find((o) => o.id.toUpperCase() === id.trim().toUpperCase());
  },
  saveWaitlist(entry: WaitlistEntry): void {
    write(WAITLIST_KEY, [...read<WaitlistEntry[]>(WAITLIST_KEY, []), entry]);
  },
};

export const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
