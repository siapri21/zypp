// src/api/me.ts
import { queryClient } from "../queryClient"; 

export async function fetchMe() {
  const r = await fetch("/api/me", { credentials: "include" });
  if (!r.ok) throw new Error("me failed");
  return r.json();
}

export async function payInvoice(id: string, method: string = "paypal") {
  const r = await fetch(`/api/me/invoices/${id}/pay?method=${method}&simulate=true`, {
    method: "POST",
    credentials: "include",
  });
  if (!r.ok) throw new Error("pay failed");
  await queryClient.invalidateQueries ({ queryKey: ["me"] });
}
