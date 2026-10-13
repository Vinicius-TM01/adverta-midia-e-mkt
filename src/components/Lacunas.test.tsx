import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Lacunas } from "./Lacunas";

describe("Lacunas (marque o que falta)", () => {
  it("começa sem CTA e com instrução", () => {
    render(<Lacunas />);
    expect(screen.getByText(/marque o que ainda não está definido/i)).toBeInTheDocument();
    expect(screen.queryByRole("link")).toBeNull();
  });
  it("marcar atualiza o contador, o aria-pressed e o link do WhatsApp", async () => {
    const user = userEvent.setup();
    render(<Lacunas />);
    const botao = screen.getByRole("button", { name: /para quem/i });
    await user.click(botao);
    expect(botao).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText(/1 de 4/)).toBeInTheDocument();
    const link = screen.getByRole("link", { name: /levar isso/i });
    expect(decodeURIComponent(link.getAttribute("href")!)).toContain("para quem");
  });
  it("desmarcar volta ao estado inicial", async () => {
    const user = userEvent.setup();
    render(<Lacunas />);
    const botao = screen.getByRole("button", { name: /para quem/i });
    await user.click(botao);
    await user.click(botao);
    expect(screen.queryByRole("link")).toBeNull();
  });
});
