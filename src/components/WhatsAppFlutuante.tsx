"use client";
import { useEffect, useState } from "react";
import { buildWhatsAppUrl, MENSAGENS } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";

const ROTULOS: Record<string, string> = { teste: "Falar sobre meu resultado", sobre: "Conversar com a Ariela", planejamento: "Quero esse planejamento" };

export function WhatsAppFlutuante() {
  const [rotulo, setRotulo] = useState("Agendar conversa inicial");
  const [visivel, setVisivel] = useState(true);
  useEffect(() => {
    const ids = [...Object.keys(ROTULOS), "contato"];
    const obs = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (!e.isIntersecting) return;
        if (e.target.id === "contato") setVisivel(false);
        else { setVisivel(true); setRotulo(ROTULOS[e.target.id]); }
      });
    }, { threshold: 0.35 });
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  if (!visivel) return null;
  return (
    <a href={buildWhatsAppUrl(MENSAGENS.inicial)} onClick={() => track("cta_click", { origem: "flutuante" })}
      style={{ position: "fixed", right: 16, bottom: 16, zIndex: 20, background: "#6A24B0", color: "#EFEAF8", fontWeight: 800, padding: "14px 18px", boxShadow: "4px 4px 0 #1E0F33" }}>
      {rotulo} →
    </a>
  );
}
