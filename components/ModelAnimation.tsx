import React from "react";

export default function ModelAnimation() {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="text-sm font-semibold">How PayLink works (model)</div>
      <p className="mt-1 text-sm text-zinc-600">
        A card notification becomes a ledger entry, then a member summary and settlement.
      </p>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <Step title="1) Card notification" subtitle="Amount, merchant, time" tone="notif" />
        <Step title="2) Shared ledger" subtitle="Auto log + categorize" tone="ledger" />
        <Step title="3) Settlement" subtitle="n-bbang + transfers" tone="settle" />
      </div>

      <div className="mt-4 rounded-xl bg-zinc-50 p-4">
        <div className="relative h-20 overflow-hidden rounded-lg border border-zinc-200 bg-white">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs shadow-sm animate-slide">
            <div className="font-semibold">[Card Alert]</div>
            <div className="text-zinc-600">₩18,000 • Lunch • 12:03</div>
          </div>

          <div className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs shadow-sm animate-pop">
            <div className="font-semibold">[Ledger Entry]</div>
            <div className="text-zinc-600">Min-gi • ₩18,000 • Food</div>
          </div>

          <div className="absolute left-1/2 top-2 -translate-x-1/2 text-[11px] text-zinc-500">
            notification → parsing → ledger update
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide {
          0% { transform: translate(0, -50%); opacity: 0; }
          10% { opacity: 1; }
          45% { transform: translate(140px, -50%); opacity: 1; }
          55% { opacity: 0; }
          100% { transform: translate(140px, -50%); opacity: 0; }
        }
        @keyframes pop {
          0% { transform: translate(0, -50%) scale(0.98); opacity: 0; }
          35% { opacity: 0; }
          55% { opacity: 1; transform: translate(0, -50%) scale(1); }
          90% { opacity: 1; }
          100% { opacity: 0; }
        }
        .animate-slide { animation: slide 4.2s ease-in-out infinite; }
        .animate-pop { animation: pop 4.2s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

function Step({ title, subtitle, tone }: { title: string; subtitle: string; tone: "notif" | "ledger" | "settle" }) {
  const badge =
    tone === "notif" ? "bg-blue-50 text-blue-700 border-blue-200" :
    tone === "ledger" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
    "bg-violet-50 text-violet-700 border-violet-200";

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4">
      <div className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${badge}`}>{title}</div>
      <div className="mt-2 text-sm text-zinc-600">{subtitle}</div>
    </div>
  );
}
