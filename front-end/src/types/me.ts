export type Rental = {
  _id: string;
  scooterId: string;
  startedAt: string | number | Date;
  endedAt?: string | number | Date | null;
  priceCents: number;
};

export type Invoice = {
  _id: string;
  createdAt: string | number | Date;
  method: "paypal" | "applepay" | "card" | "none" | string;
  amountCents: number;
  status: "issued" | "paid" | "void" | string;
};

export type User = { id?: string; email: string; name?: string };
export type PaymentMethod = {
  _id: string;
  provider: "card" | "paypal" | "applepay" | string;
  label?: string | null;
  last4?: string | null;
};
