/**
 * Pasarela de pagos. Futuro: Wompi (PSE, tarjetas, Nequi, Daviplata) vía API server-side.
 * Reemplazar createCheckout por la creación de la transacción y verifyWebhook por la validación de la firma de eventos.
 */
import type { CheckoutResult, Order } from './types';
import { mockDb, wait } from './mockDb';

export interface PaymentAdapter {
  createCheckout(order: Order): Promise<CheckoutResult>;
  verifyWebhook(payload: unknown, signature: string): Promise<{ valid: boolean; orderId?: string; status?: 'approved' | 'declined' | 'pending' }>;
}

export const paymentAdapter: PaymentAdapter = {
  async createCheckout(order) {
    await wait(1200);
    mockDb.saveOrder(order);
    return { ok: true, orderId: order.id, redirectUrl: `/gracias?order=${encodeURIComponent(order.id)}` };
  },
  async verifyWebhook() {
    return { valid: true, status: 'approved' };
  },
};
