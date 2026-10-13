"use client";
import { useState } from "react";
import s from "./narrativa.module.css";
import { DECISOES, mensagemLacunas, resumoLacunas } from "@/lib/lacunas";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";

export function Lacunas() {
  const [marcadas, setMarcadas] = useState<string[]>([]);
  function alternar(id: string) {
    setMarcadas((atual) => {
      const novo = atual.includes(id) ? atual.filter((x) => x !== id) : [...atual, id];
      if (!atual.includes(id)) track("lacuna_marcada", { id, total: novo.length });
      return novo;
    });
  }
  return (
    <div className={s.lacunas} data-revela="sobe">
      <p className={s.lacunasTitulo}>Faz a sua parte: o que você ainda não definiu?</p>
      <div className={s.lacunasGrade}>
        {DECISOES.map((d) => {
          const ativa = marcadas.includes(d.id);
          return (
            <button key={d.id} type="button" aria-pressed={ativa} className={`${s.lacuna} ${ativa ? s.lacunaAtiva : ""}`} onClick={() => alternar(d.id)}>
              <span className={s.lacunaCaixa} aria-hidden="true">{ativa ? "✕" : ""}</span>
              <span className={s.lacunaTexto}>{d.rotulo}</span>
            </button>
          );
        })}
      </div>
      <p className={s.lacunasResumo} aria-live="polite">{resumoLacunas(marcadas)}</p>
      {marcadas.length > 0 && (
        <a className={s.lacunasCta} href={buildWhatsAppUrl(mensagemLacunas(marcadas))} onClick={() => track("cta_click", { origem: "lacunas", total: marcadas.length })}>
          Levar isso pra conversa →
        </a>
      )}
    </div>
  );
}
