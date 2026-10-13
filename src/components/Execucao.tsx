import s from "./fechamento.module.css";

const ITENS = ["Identidade visual", "Produção de vídeo e fotografia", "Gestão de redes sociais", "Site e landing page", "Anúncios"];

export function Execucao() {
  return (
    <section className={`container ${s.execucao}`} aria-labelledby="exec-t">
      <p className={s.rotulo}>depois do mapa</p>
      <h2 id="exec-t" className={s.titulo}>Depois do mapa, a gente executa.</h2>
      <ul className={s.itens}>{ITENS.map((i) => <li key={i}>{i}</li>)}</ul>
    </section>
  );
}
