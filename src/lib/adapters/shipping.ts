/**
 * Envíos y rastreo. Futuro: Mipaquete o Envía (cotización, generación de guía y tracking).
 * Reemplazar createShipment por la creación de la guía y getTracking por la consulta del estado a la transportadora.
 */
import type { Order, Tracking } from './types';
import { mockDb, wait } from './mockDb';
import { copy } from '@/content/copy';

export interface ShippingAdapter {
  createShipment(order: Order): Promise<{ guide: string; carrier: string }>;
  getTracking(orderId: string): Promise<Tracking | null>;
}

export const shippingAdapter: ShippingAdapter = {
  async createShipment(order) {
    await wait(300);
    return { guide: `MOCK-${order.id.replace('VX-', '')}`, carrier: 'Por asignar' };
  },
  async getTracking(orderId) {
    await wait(600);
    const id = orderId.trim().toUpperCase();
    const order = mockDb.getOrder(id);
    // Para la demo, VX-0001 siempre existe aunque no se haya hecho una compra.
    if (!order && id !== 'VX-0001') return null;
    const created = order ? new Date(order.createdAt) : new Date();
    const stepsDone = order ? 1 : 3;
    return {
      orderId: id,
      carrier: 'Por asignar',
      guide: stepsDone > 2 ? `MOCK-${id.replace('VX-', '')}` : null,
      steps: copy.tracking.steps.map((label, i) => ({
        label,
        done: i < stepsDone,
        date: i < stepsDone ? new Date(created.getTime() + i * 86400000).toISOString() : null,
      })),
    };
  },
};
