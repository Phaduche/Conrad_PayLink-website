export function currencyKRW(n: number) {
  const v = Number.isFinite(n) ? n : 0;
  return new Intl.NumberFormat("ko-KR").format(Math.round(v));
}

export function clampInt(v: string) {
  const x = Number(String(v).replace(/[^0-9]/g, ""));
  return Number.isFinite(x) ? x : 0;
}
