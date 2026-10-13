import s from "./fechamento.module.css";
import { FAQ } from "@/content/faq";

export function Faq() {
  return (
    <section className={`container ${s.faq}`} aria-labelledby="faq-t">
      <h2 id="faq-t" className={s.titulo}>Perguntas frequentes</h2>
      {FAQ.map((f) => (
        <details key={f.pergunta} className={s.pergunta}>
          <summary>{f.pergunta}</summary>
          <p>{f.resposta}</p>
        </details>
      ))}
    </section>
  );
}
