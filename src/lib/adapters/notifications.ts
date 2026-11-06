/**
 * Notificaciones al cliente. Futuro: WhatsApp Business API (plantillas aprobadas) + correo transaccional.
 * Reemplazar por llamadas server-side disparadas desde los webhooks de pago y de envío.
 */
import type { Order, Tracking } from './types';
import { wait } from './mockDb';

export interface NotificationsAdapter {
  sendOrderConfirmation(order: Order): Promise<{ sent: boolean }>;
  sendShippingUpdate(order: Order, tracking: Tracking): Promise<{ sent: boolean }>;
}

export const notificationsAdapter: NotificationsAdapter = {
  async sendOrderConfirmation() {
    await wait(100);
    return { sent: true };
  },
  async sendShippingUpdate() {
    await wait(100);
    return { sent: true };
  },
};
