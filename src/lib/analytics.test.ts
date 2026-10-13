import { track } from "./analytics";

type W = { gtag?: unknown; fbq?: unknown };

describe("track", () => {
  afterEach(() => { delete (window as W).gtag; delete (window as W).fbq; });
  it("não quebra sem gtag/fbq", () => { expect(() => track("cta_click")).not.toThrow(); });
  it("envia para gtag e fbq quando existem", () => {
    const gtag = vi.fn(); const fbq = vi.fn();
    (window as W).gtag = gtag; (window as W).fbq = fbq;
    track("quiz_complete", { nivel: "Achismo puro" });
    expect(gtag).toHaveBeenCalledWith("event", "quiz_complete", { nivel: "Achismo puro" });
    expect(fbq).toHaveBeenCalledWith("trackCustom", "quiz_complete", { nivel: "Achismo puro" });
  });
});
