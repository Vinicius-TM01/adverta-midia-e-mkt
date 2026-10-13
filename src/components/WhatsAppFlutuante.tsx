"use client";
import { useEffect, useState } from "react";
import { buildWhatsAppUrl, MENSAGENS } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";

const ROTULOS: Record<string, string> = { teste: "Falar sobre meu resultado", sobre: "Conversar com a Ariela", planejamento: "Quero esse planejamento" };

// O hero já tem o CTA principal e o fechamento tem o último: o botão só aparece entre os dois.
export function WhatsAppFlutuante() {
  const [rotulo, setRotulo] = useState("Agendar conversa inicial");
  const [noHero, setNoHero] = useState(true);
  const [noFechamento, setNoFechamento] = useState(false);
  useEffect(() => {
    const ids = ["inicio", ...Object.keys(ROTULOS), "contato"];
    const obs = new IntersectionObserver((es) => {
      es.forEach((e) => {
        const id = e.target.id;
        if (id === "inicio") setNoHero(e.isIntersecting);
        else if (id === "contato") setNoFechamento(e.isIntersecting);
        else if (e.isIntersecting) setRotulo(ROTULOS[id]);
      });
    }, { threshold: 0.35 });
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  if (noHero || noFechamento) return null;
  return (
    <a href={buildWhatsAppUrl(MENSAGENS.inicial)} onClick={() => track("cta_click", { origem: "flutuante" })}
      style={{ position: "fixed", right: 16, bottom: 16, zIndex: 20, background: "#FFD43B", color: "#1E0F33", fontWeight: 800, padding: "14px 18px", boxShadow: "4px 4px 0 #8B3FD9" }}>
      {rotulo} →
    </a>
  );
}
