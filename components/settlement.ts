export type Member = { id: string; name: string };
export type Tx = { id: string; payerId: string; amount: number; category: string; merchant: string };

export function computeSettlement(members: Member[], txs: Tx[]) {
  const totalsById: Record<string, number> = Object.fromEntries(members.map((m) => [m.id, 0]));
  let total = 0;

  for (const t of txs) {
    if (!(t.payerId in totalsById)) continue;
    const amt = Number(t.amount) || 0;
    totalsById[t.payerId] += amt;
    total += amt;
  }

  const n = members.length || 1;
  const share = total / n;

  const netById: Record<string, number> = Object.fromEntries(
    members.map((m) => [m.id, (totalsById[m.id] || 0) - share])
  );

  const creditors = members
    .map((m) => ({ name: m.name, amt: netById[m.id] }))
    .filter((x) => x.amt > 1e-9)
    .sort((a, b) => b.amt - a.amt);

  const debtors = members
    .map((m) => ({ name: m.name, amt: -netById[m.id] }))
    .filter((x) => x.amt > 1e-9)
    .sort((a, b) => b.amt - a.amt);

  const transfers: { from: string; to: string; amount: number }[] = [];
  let i = 0, j = 0;

  while (i < debtors.length && j < creditors.length) {
    const d = debtors[i];
    const c = creditors[j];
    const pay = Math.min(d.amt, c.amt);

    if (pay > 1e-9) {
      transfers.push({ from: d.name, to: c.name, amount: Math.round(pay) });
      d.amt -= pay;
      c.amt -= pay;
    }
    if (d.amt <= 1e-9) i++;
    if (c.amt <= 1e-9) j++;
  }

  return { total, share, totalsById, netById, transfers };
}
