"use client";

import React, { useMemo, useState } from "react";
import ModelAnimation from "@/components/ModelAnimation";
import { clampInt, currencyKRW } from "@/components/utils";
import { computeSettlement, Member, Tx } from "@/components/settlement";

export default function Page() {
  const [members, setMembers] = useState<Member[]>([
    { id: "minki", name: "Min-gi" },
    { id: "taewoo", name: "Taewoo" },
    { id: "sungjun", name: "Sungjun" },
    { id: "daeun", name: "Daeun" },
  ]);

  const [txs, setTxs] = useState<Tx[]>([
    {
      id: "t1",
      payerId: "minki",
      amount: 18000,
      category: "Food",
      merchant: "Lunch",
    },
    {
      id: "t2",
      payerId: "taewoo",
      amount: 12000,
      category: "Transport",
      merchant: "Bus/Subway",
    },
    {
      id: "t3",
      payerId: "sungjun",
      amount: 10000,
      category: "Tickets",
      merchant: "Museum",
    },
  ]);

  const [newMember, setNewMember] = useState("");
  const [draft, setDraft] = useState({
    payerId: "minki",
    amount: "",
    category: "Food",
    merchant: "",
  });

  const settlement = useMemo(
    () => computeSettlement(members, txs),
    [members, txs]
  );

  const addMember = () => {
    const name = newMember.trim();
    if (!name) return;
    const id =
      name.toLowerCase().replace(/\s+/g, "-") +
      "-" +
      Math.random().toString(16).slice(2, 6);
    setMembers((prev) => [...prev, { id, name }]);
    setNewMember("");
  };

  const removeMember = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
    setTxs((prev) => prev.filter((t) => t.payerId !== id));
  };

  const addTx = () => {
    const amount = clampInt(draft.amount);
    if (!draft.payerId || amount <= 0) return;
    const id = "t" + Math.random().toString(16).slice(2, 9);
    setTxs((prev) => [
      ...prev,
      {
        id,
        payerId: draft.payerId,
        amount,
        category: (draft.category || "Other").trim() || "Other",
        merchant: (draft.merchant || "").trim() || "(Notification)",
      },
    ]);
    setDraft((d) => ({ ...d, amount: "", merchant: "" }));
  };

  const removeTx = (id: string) =>
    setTxs((prev) => prev.filter((t) => t.id !== id));

  const resetDemo = () => {
    setMembers([
      { id: "minki", name: "Min-gi" },
      { id: "taewoo", name: "Taewoo" },
      { id: "sungjun", name: "Sungjun" },
      { id: "daeun", name: "Daeun" },
    ]);
    setTxs([
      {
        id: "t1",
        payerId: "minki",
        amount: 18000,
        category: "Food",
        merchant: "Lunch",
      },
      {
        id: "t2",
        payerId: "taewoo",
        amount: 12000,
        category: "Transport",
        merchant: "Bus/Subway",
      },
      {
        id: "t3",
        payerId: "sungjun",
        amount: 10000,
        category: "Tickets",
        merchant: "Museum",
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <header className="border-b border-zinc-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl border border-zinc-200 bg-zinc-50 grid place-items-center font-semibold">
              P
            </div>
            <div>
              <div className="text-sm font-semibold leading-none">PayLink</div>
              <div className="text-xs text-zinc-600">
                Automated group expenses
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <a
              className="rounded-lg border border-zinc-200 px-3 py-2 text-sm hover:bg-zinc-50"
              href="#demo"
            >
              Demo
            </a>
            <a
              className="rounded-lg border border-zinc-200 px-3 py-2 text-sm hover:bg-zinc-50"
              href="#pricing"
            >
              Pricing
            </a>
            <a
              className="rounded-lg bg-zinc-900 px-3 py-2 text-sm text-white hover:bg-zinc-800"
              href="#download"
            >
              Innovation Image
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <div>
            <div className="inline-flex rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700">
              Conrad Challenge • Cyber-Technology & Security
            </div>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Group money,{" "}
              <span className="underline underline-offset-4">automatic</span>.
            </h1>
            <p className="mt-4 text-base leading-7 text-zinc-700">
              PayLink turns individual card notifications into a shared ledger
              and instantly calculates n-bbang settlement. No treasurer, no
              spreadsheets—just transparent records and fair transfers.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#demo"
                className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
              >
                Try the demo
              </a>
              <a
                href="#pricing"
                className="rounded-xl border border-zinc-200 px-4 py-2 text-sm font-medium hover:bg-zinc-50"
              >
                See pricing
              </a>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <KPI title="Ledger transparency" value="Real-time" />
              <KPI title="Settlement output" value="Auto n-bbang" />
              <KPI title="Overhead" value="No treasurer" />
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold">Quick example</div>
            <p className="mt-1 text-sm text-zinc-600">
              This is the exact style we use for the Innovation Image.
            </p>

            <div className="mt-4 rounded-xl border border-zinc-200 bg-white p-4 font-mono text-sm">
              <div className="font-semibold">[ Member Summary ]</div>
              <div className="mt-2 grid grid-cols-3 gap-y-1">
                <div>Min-gi</div>
                <div>Paid ₩18,000</div>
                <div className="text-right">+₩8,000</div>
                <div>Taewoo</div>
                <div>Paid ₩12,000</div>
                <div className="text-right">+₩2,000</div>
                <div>Sungjun</div>
                <div>Paid ₩10,000</div>
                <div className="text-right">₩0</div>
                <div>Daeun</div>
                <div>Paid ₩0</div>
                <div className="text-right">-₩10,000</div>
              </div>
              <div className="my-3 h-px bg-zinc-200" />
              <div className="font-semibold">[ Settlement ]</div>
              <div className="mt-2 space-y-1">
                <div>Daeun → Min-gi ₩8,000</div>
                <div>Daeun → Taewoo ₩2,000</div>
              </div>
            </div>

            <div className="mt-4 text-xs text-zinc-600">
              Tip: You can screenshot this card (or download the SVG below) to
              submit as your Innovation Image.
            </div>
          </div>
        </div>
      </section>

      {/* MODEL ANIMATION */}
      <section className="mx-auto max-w-6xl px-6 pb-6">
        <ModelAnimation />
      </section>

      {/* DEMO */}
      <section id="demo" className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">Interactive Demo</h2>
            <p className="mt-2 text-sm text-zinc-600">
              Add members and transactions (like card notifications). PayLink
              computes totals, per-member share, and settlement transfers.
            </p>
          </div>
          <button
            onClick={resetDemo}
            className="rounded-xl border border-zinc-200 px-4 py-2 text-sm font-medium hover:bg-zinc-50"
          >
            Reset demo
          </button>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {/* MEMBERS */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="text-lg font-semibold">Members</div>
            <div className="mt-4 flex gap-2">
              <input
                className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-200"
                value={newMember}
                onChange={(e) => setNewMember(e.target.value)}
                placeholder="Add member (e.g., Jisoo)"
              />
              <button
                onClick={addMember}
                className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
              >
                Add
              </button>
            </div>
            <div className="mt-4 space-y-2">
              {members.map((m) => (
                <div
                  key={m.id}
                  className="flex items-center justify-between rounded-xl border border-zinc-200 px-3 py-2"
                >
                  <div className="text-sm font-medium">{m.name}</div>
                  <button
                    onClick={() => removeMember(m.id)}
                    className="rounded-lg px-2 py-1 text-xs text-zinc-700 hover:bg-zinc-50"
                    title="Remove member"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-zinc-600">
              Removing a member also removes that member’s transactions in this
              demo.
            </p>
          </div>

          {/* TXS */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm lg:col-span-2">
            <div className="text-lg font-semibold">
              Transactions (like card notifications)
            </div>

            <div className="mt-4 grid gap-2 md:grid-cols-4">
              <div>
                <div className="mb-1 text-xs text-zinc-600">Payer</div>
                <select
                  className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-200"
                  value={draft.payerId}
                  onChange={(e) =>
                    setDraft((d) => ({ ...d, payerId: e.target.value }))
                  }
                >
                  {members.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="mb-1 text-xs text-zinc-600">Amount (KRW)</div>
                <input
                  className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-200"
                  value={draft.amount}
                  onChange={(e) =>
                    setDraft((d) => ({ ...d, amount: e.target.value }))
                  }
                  placeholder="e.g., 18000"
                />
              </div>

              <div>
                <div className="mb-1 text-xs text-zinc-600">Category</div>
                <input
                  className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-200"
                  value={draft.category}
                  onChange={(e) =>
                    setDraft((d) => ({ ...d, category: e.target.value }))
                  }
                  placeholder="Food"
                />
              </div>

              <div>
                <div className="mb-1 text-xs text-zinc-600">
                  Merchant / Note
                </div>
                <input
                  className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-200"
                  value={draft.merchant}
                  onChange={(e) =>
                    setDraft((d) => ({ ...d, merchant: e.target.value }))
                  }
                  placeholder="Cafe / Bus"
                />
              </div>
            </div>

            <div className="mt-3">
              <button
                onClick={addTx}
                className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
              >
                Add transaction
              </button>
            </div>

            <div className="mt-5 space-y-2">
              {txs.length === 0 ? (
                <div className="text-sm text-zinc-600">
                  No transactions yet.
                </div>
              ) : (
                txs.map((t) => {
                  const payer =
                    members.find((m) => m.id === t.payerId)?.name || "Unknown";
                  return (
                    <div
                      key={t.id}
                      className="flex items-center justify-between rounded-xl border border-zinc-200 px-3 py-2"
                    >
                      <div className="min-w-0">
                        <div className="truncate text-sm font-medium">
                          {payer} • ₩{currencyKRW(t.amount)} • {t.category}
                        </div>
                        <div className="truncate text-xs text-zinc-600">
                          {t.merchant}
                        </div>
                      </div>
                      <button
                        onClick={() => removeTx(t.id)}
                        className="rounded-lg px-2 py-1 text-xs text-zinc-700 hover:bg-zinc-50"
                      >
                        Remove
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {/* SUMMARY */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm lg:col-span-2">
            <div className="flex items-center justify-between gap-3">
              <div className="text-lg font-semibold">Member Summary</div>
              <div className="text-sm text-zinc-600">
                Share per member: ₩{currencyKRW(settlement.share)}
              </div>
            </div>

            <div className="mt-4 overflow-hidden rounded-xl border border-zinc-200">
              <div className="grid grid-cols-3 bg-zinc-50 px-3 py-2 text-xs font-medium text-zinc-600">
                <div>Member</div>
                <div>Paid</div>
                <div className="text-right">Net</div>
              </div>

              {members.map((m) => {
                const paid = settlement.totalsById[m.id] || 0;
                const net = settlement.netById[m.id] || 0;
                const sign = net > 0 ? "+" : net < 0 ? "-" : "";
                return (
                  <div
                    key={m.id}
                    className="grid grid-cols-3 border-t border-zinc-200 px-3 py-2 text-sm"
                  >
                    <div className="font-medium">{m.name}</div>
                    <div>₩{currencyKRW(paid)}</div>
                    <div className="text-right">
                      {sign}₩{currencyKRW(Math.abs(net))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              <Stat
                label="Total spent"
                value={`₩${currencyKRW(settlement.total)}`}
              />
              <Stat label="Members" value={`${members.length}`} />
              <Stat label="Transactions" value={`${txs.length}`} />
            </div>
          </div>

          {/* SETTLEMENT */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="text-lg font-semibold">Settlement</div>
            <p className="mt-2 text-sm text-zinc-600">
              Smallest set of transfers to settle balances fairly.
            </p>

            <div className="mt-4 space-y-2">
              {settlement.transfers.length === 0 ? (
                <div className="rounded-xl border border-zinc-200 px-3 py-2 text-sm text-zinc-600">
                  All settled. No transfers needed.
                </div>
              ) : (
                settlement.transfers.map((tr, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-zinc-200 px-3 py-2 text-sm"
                  >
                    <div className="font-medium">
                      {tr.from} → {tr.to}
                    </div>
                    <div className="text-zinc-600">
                      ₩{currencyKRW(tr.amount)}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-4 rounded-xl bg-zinc-50 p-4 text-xs text-zinc-600">
              Tip: For your Innovation Video, record this section while you add
              expenses. Judges can clearly see totals → share → net →
              settlement.
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="mx-auto max-w-6xl px-6 pb-12">
        <h2 className="text-2xl font-semibold">Pricing (concept)</h2>
        <p className="mt-2 text-sm text-zinc-600">
          Simple pricing for student teams. You can adjust these later—this page
          demonstrates the business model clearly.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <PriceCard
            name="Free"
            price="₩0"
            note="For small groups"
            items={[
              "1 group",
              "Basic ledger",
              "Equal split (n-bbang)",
              "Manual entry fallback",
            ]}
          />
          <PriceCard
            name="Pro"
            price="₩1,900 / month"
            note="For active clubs"
            items={[
              "Unlimited groups",
              "Auto tags",
              "Settlement suggestions",
              "Export (CSV/PDF)",
            ]}
          />
          <PriceCard
            name="Club / School"
            price="Contact"
            note="For organizations"
            items={[
              "Admin dashboard",
              "Audit logs",
              "Multiple club spaces",
              "Priority support",
            ]}
          />
        </div>
      </section>

      {/* DOWNLOAD */}
      <section id="download" className="mx-auto max-w-6xl px-6 pb-14">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Innovation Image</h2>
          <p className="mt-2 text-sm text-zinc-600">
            Download the clean SVG image for your Conrad submission, or
            screenshot the example card above.
          </p>
          <div className="mt-4">
            <a
              className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
              href="/innovation-image.svg"
              download
            >
              Download innovation-image.svg
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-200">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-sm font-semibold">PayLink</div>
              <div className="text-xs text-zinc-600">
                Demo website for Conrad Challenge submission.
              </div>
            </div>
            <div className="text-xs text-zinc-600">
              Do not share sensitive financial data on public pages.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function KPI({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="text-xs font-medium text-zinc-600">{title}</div>
      <div className="mt-1 text-sm font-semibold">{value}</div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-3">
      <div className="text-xs text-zinc-600">{label}</div>
      <div className="text-sm font-semibold">{value}</div>
    </div>
  );
}

function PriceCard({
  name,
  price,
  note,
  items,
}: {
  name: string;
  price: string;
  note: string;
  items: string[];
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="text-lg font-semibold">{name}</div>
      <div className="mt-2 text-3xl font-semibold">{price}</div>
      <div className="mt-1 text-sm text-zinc-600">{note}</div>
      <div className="my-4 h-px bg-zinc-200" />
      <ul className="space-y-2 text-sm">
        {items.map((it) => (
          <li key={it} className="flex gap-2">
            <span className="mt-1 inline-block h-2 w-2 rounded-full bg-zinc-900" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
