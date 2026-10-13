"use client";
import { useState } from "react";
import s from "./Teste.module.css";
import { PERGUNTAS, pontuar } from "@/lib/quiz";
import { buildWhatsAppUrl, MENSAGENS } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";

export function Teste() {
  const [passo, setPasso] = useState(0);
  const [respostas, setRespostas] = useState<number[]>([]);
  const [escolha, setEscolha] = useState<number | null>(null);
  const [resultado, setResultado] = useState<ReturnType<typeof pontuar> | null>(null);

  function avancar() {
    if (escolha === null) return;
    const novas = [...respostas, escolha];
    if (passo === PERGUNTAS.length - 1) {
      const r = pontuar(novas);
      setResultado(r);
      track("quiz_complete", { nivel: r.nivel.id, pontos: r.total });
    } else {
      setRespostas(novas);
      setPasso(passo + 1);
      setEscolha(null);
    }
  }
  function refazer() { setPasso(0); setRespostas([]); setEscolha(null); setResultado(null); }

  const pergunta = PERGUNTAS[passo];
  return (
    <section id="teste" className={`container ${s.secao}`} aria-labelledby="teste-titulo">
      <p className={s.rotulo}>teste rápido, sem cadastro</p>
      <h2 id="teste-titulo" className={s.titulo}>Teste do achismo</h2>
      <div className={s.caderno} aria-live="polite">
        {resultado ? (
          <div className={s.resultado}>
            <p className={s.pontos}>{resultado.total} / 12</p>
            <h3>{resultado.nivel.nome}</h3>
            <p>{resultado.nivel.texto}</p>
            <div className={s.acoes}>
              <a className={s.cta} href={buildWhatsAppUrl(MENSAGENS.teste(resultado.total, resultado.nivel.nome))} onClick={() => track("quiz_cta_click", { nivel: resultado.nivel.id })}>Conversar com a Ariela →</a>
              <button type="button" className={s.refazer} onClick={refazer}>Refazer o teste</button>
            </div>
            <p className={s.aviso}>Este teste é uma conversa de partida, não um diagnóstico. As respostas não ficam salvas.</p>
          </div>
        ) : (
          <fieldset className={s.pergunta}>
            <legend>
              <span className={s.contador}>Pergunta {passo + 1} de {PERGUNTAS.length} · {pergunta.pilar}</span>
              <span className={s.enunciado}>{pergunta.texto}</span>
            </legend>
            {pergunta.opcoes.map((o, i) => (
              <label key={o.texto} className={`${s.opcao} ${escolha === i ? s.marcada : ""}`}>
                <input type="radio" name={`p${passo}`} checked={escolha === i} onChange={() => setEscolha(i)} />
                <span>{o.texto}</span>
              </label>
            ))}
            <button type="button" className={s.proxima} disabled={escolha === null} onClick={avancar}>
              {passo === PERGUNTAS.length - 1 ? "Ver resultado" : "Próxima →"}
            </button>
          </fieldset>
        )}
      </div>
    </section>
  );
}
