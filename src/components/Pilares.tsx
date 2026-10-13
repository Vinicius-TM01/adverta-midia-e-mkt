import s from "./narrativa.module.css";
import { PILARES } from "@/content/pilares";

export function Pilares() {
  return (
    <section id="planejamento" className={`container ${s.secao}`} aria-labelledby="pilares">
      <p className={s.rotulo} data-revela="escreve">o que o plano define</p>
      <h2 id="pilares" className={s.titulo} data-revela="sobe">Seis decisões antes do primeiro post.</h2>
      <ul className={s.pilares}>
        {PILARES.map((p, i) => (
          <li key={p.titulo} className={s.pilar} data-revela="cai" style={{ "--i": i % 3 } as React.CSSProperties}>
            <h3>{p.titulo}</h3>
            <p>{p.descricao}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
