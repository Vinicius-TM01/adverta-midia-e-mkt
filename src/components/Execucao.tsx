import s from "./fechamento.module.css";

const ITENS = ["Identidade visual", "Produção de vídeo e fotografia", "Gestão de redes sociais", "Site e landing page", "Anúncios"];

export function Execucao() {
  return (
    <section className={`container ${s.execucao}`} aria-labelledby="exec-t">
      <p className={s.rotulo} data-revela="escreve">depois do mapa</p>
      <h2 id="exec-t" className={s.titulo} data-revela="sobe">Depois do mapa, a gente executa.</h2>
      <ul className={s.itens}>{ITENS.map((item, i) => <li key={item} data-revela="sobe" style={{ "--i": i } as React.CSSProperties}>{item}</li>)}</ul>
    </section>
  );
}
