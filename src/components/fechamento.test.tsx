import { render, screen } from "@testing-library/react";
import { CLIENTES } from "@/content/clientes";
import { FAQ } from "@/content/faq";
import { Prova } from "./Prova";
import { Faq } from "./Faq";
import { Fechamento } from "./Fechamento";

describe("provas e fechamento", () => {
  it("todo cliente tem nome e alt descritivo (sem 'logo', 'yyy' ou vazio)", () => {
    CLIENTES.forEach((c) => expect(c.nome.trim().length).toBeGreaterThan(1));
    expect(CLIENTES.length).toBeGreaterThan(0);
    render(<Prova />);
    const imgs = screen.getAllByRole("img");
    expect(imgs).toHaveLength(CLIENTES.length);
    imgs.forEach((img) => {
      const alt = img.getAttribute("alt") ?? "";
      expect(alt).not.toMatch(/^(logo|yyy|fvdff)?$/i);
      expect(alt.length).toBeGreaterThan(12);
    });
  });
  it("não repete arquivos de logo", () => {
    expect(new Set(CLIENTES.map((c) => c.arquivo)).size).toBe(CLIENTES.length);
  });
  it("FAQ tem 5 perguntas e todas as respostas visíveis no HTML", () => {
    expect(FAQ).toHaveLength(5);
    render(<Faq />);
    FAQ.forEach((f) => expect(screen.getByText(f.resposta)).toBeInTheDocument());
  });
  it("Fechamento tem âncora #contato, WhatsApp, e-mail e Instagram", () => {
    const { container } = render(<Fechamento />);
    expect(container.querySelector("#contato")).not.toBeNull();
    expect(screen.getByRole("link", { name: /agendar conversa inicial/i }).getAttribute("href")).toContain("wa.me/556984488703");
    expect(screen.getByRole("link", { name: /arielafelicia@advertamkt\.com\.br/ })).toHaveAttribute("href", "mailto:arielafelicia@advertamkt.com.br");
    expect(screen.getByRole("link", { name: /@adverta\.mkt/ })).toHaveAttribute("href", "https://www.instagram.com/adverta.mkt/");
  });
  it("nenhum texto da seção de prova ou do fechamento cita preço", () => {
    const { container } = render(<><Prova /><Faq /><Fechamento /></>);
    expect(container.textContent).not.toMatch(/R\$\s?\d/);
  });
});
