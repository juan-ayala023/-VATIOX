/**
 * Facturación electrónica DIAN. Futuro: Alegra o Siigo.
 * Reemplazar issueInvoice por la emisión de la factura desde el webhook de pago aprobado (server-side).
 */
import type { Order } from './types';
import { wait } from './mockDb';

export interface InvoicingAdapter {
  issueInvoice(order: Order): Promise<{ invoiceId: string; pdfUrl: string | null }>;
}

export const invoicingAdapter: InvoicingAdapter = {
  async issueInvoice(order) {
    await wait(200);
    return { invoiceId: `FE-MOCK-${order.id}`, pdfUrl: null };
  },
};
