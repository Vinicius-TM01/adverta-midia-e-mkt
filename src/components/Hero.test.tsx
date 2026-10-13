import { render, screen } from "@testing-library/react";
import { Hero } from "./Hero";

describe("Hero", () => {
  it("tem um único H1 com o texto exato, sem a palavra da correção", () => {
    render(<Hero />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1.textContent?.replace(/\s+/g, " ").trim()).toBe("Marketing não é postar mais. É saber por que postar.");
  });
  it("CTA principal abre o WhatsApp com a mensagem inicial", () => {
    render(<Hero />);
    const cta = screen.getByRole("link", { name: /agendar conversa inicial/i });
    expect(cta.getAttribute("href")).toContain("https://wa.me/556984488703?text=");
  });
  it("link do teste aponta para #teste e a foto tem alt descritivo", () => {
    render(<Hero />);
    expect(screen.getByRole("link", { name: /teste do achismo/i })).toHaveAttribute("href", "#teste");
    expect(screen.getByAltText(/Ariela Felícia/)).toBeInTheDocument();
  });
  it("lista os 6 pilares", () => {
    render(<Hero />);
    expect(screen.getAllByRole("listitem").length).toBeGreaterThanOrEqual(6);
  });
});
