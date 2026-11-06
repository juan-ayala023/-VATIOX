/**
 * Lista de espera de lanzamiento. Futuro: tabla en Supabase + flujo en n8n (mensaje de bienvenida por WhatsApp).
 * Reemplazar joinWaitlist por un insert vía route handler / server action con validación del consentimiento.
 */
import type { WaitlistEntry } from './types';
import { mockDb, wait } from './mockDb';

export interface WaitlistAdapter {
  joinWaitlist(entry: WaitlistEntry): Promise<{ ok: boolean; error?: string }>;
}

export const waitlistAdapter: WaitlistAdapter = {
  async joinWaitlist(entry) {
    await wait(800);
    if (!entry.consent) return { ok: false, error: 'consent_required' };
    mockDb.saveWaitlist(entry);
    return { ok: true };
  },
};
