export type PaymentMethod = 'pse' | 'card' | 'nequi' | 'daviplata';

export type Customer = {
  name: string;
  idNumber: string;
  email: string;
  phone: string; // 10 dígitos, sin +57
  department: string;
  city: string;
  address: string;
  neighborhood: string;
  notes?: string;
};

export type OrderLine = {
  productId: string;
  offerId: string;
  label: string;
  qty: number;
  units: number;
  unitPriceCOP: number;
  lineTotalCOP: number;
};

export type Order = {
  id: string; // VX-0001
  createdAt: string;
  customer: Customer;
  lines: OrderLine[];
  subtotalCOP: number;
  discountCOP: number;
  shippingCOP: number;
  totalCOP: number;
  paymentMethod: PaymentMethod;
  ambassadorCode: string | null; // atribución de ventas por embajador
  acceptedTermsAt: string;
};

export type CheckoutResult = {
  ok: boolean;
  orderId: string;
  redirectUrl: string;
  error?: string;
};

export type TrackingStep = {
  label: string;
  date: string | null;
  done: boolean;
};

export type Tracking = {
  orderId: string;
  carrier: string;
  guide: string | null;
  steps: TrackingStep[];
};

export type WaitlistEntry = {
  name: string;
  phone: string; // +57XXXXXXXXXX
  city: string;
  discipline: string;
  consent: boolean;
  createdAt: string;
};
