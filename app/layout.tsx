import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PayLink — Automated Group Expenses",
  description: "PayLink turns card notifications into a shared ledger and auto-calculates n-bbang settlement.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
