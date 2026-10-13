"use client";
import { buildWhatsAppUrl, MENSAGENS } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";

export function CtaWhatsApp({ className }: { className?: string }) {
  return (
    <a className={className} href={buildWhatsAppUrl(MENSAGENS.inicial)} onClick={() => track("cta_click", { origem: "hero" })}>
      Agendar conversa inicial →
    </a>
  );
}
