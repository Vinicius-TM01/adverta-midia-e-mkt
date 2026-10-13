type Params = Record<string, string | number>;
type W = { gtag?: (...a: unknown[]) => void; fbq?: (...a: unknown[]) => void };

export function track(event: string, params: Params = {}): void {
  if (typeof window === "undefined") return;
  const w = window as unknown as W;
  w.gtag?.("event", event, params);
  w.fbq?.("trackCustom", event, params);
}
