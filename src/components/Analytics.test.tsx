import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Analytics } from "./Analytics";
import { CtaWhatsApp } from "./CtaWhatsApp";

describe("Analytics", () => {
  afterEach(() => { vi.unstubAllEnvs(); });
  it("não injeta scripts sem IDs", () => {
    vi.stubEnv("NEXT_PUBLIC_GA_ID", "");
    vi.stubEnv("NEXT_PUBLIC_META_PIXEL_ID", "");
    const { container } = render(<Analytics />);
    expect(container.innerHTML).toBe("");
  });
});

describe("CtaWhatsApp", () => {
  afterEach(() => { delete (window as { gtag?: unknown }).gtag; });
  it("renderiza o link do WhatsApp e registra o clique do hero", async () => {
    const gtag = vi.fn();
    (window as unknown as { gtag: unknown }).gtag = gtag;
    render(<CtaWhatsApp className="x" />);
    const link = screen.getByRole("link", { name: /agendar conversa inicial/i });
    expect(link.getAttribute("href")).toContain("https://wa.me/556984488703?text=");
    await userEvent.setup().click(link);
    expect(gtag).toHaveBeenCalledWith("event", "cta_click", { origem: "hero" });
  });
});
