import s from "./narrativa.module.css";
import { PILARES } from "@/content/pilares";

export function Pilares() {
  return (
    <section id="planejamento" className={`container ${s.secao}`} aria-labelledby="pilares">
      <p className={s.rotulo}>o que o plano define</p>
      <h2 id="pilares" className={s.titulo}>Seis decisões antes do primeiro post.</h2>
      <ul className={s.pilares}>
        {PILARES.map((p) => (
          <li key={p.titulo} className={s.pilar}>
            <h3>{p.titulo}</h3>
            <p>{p.descricao}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
