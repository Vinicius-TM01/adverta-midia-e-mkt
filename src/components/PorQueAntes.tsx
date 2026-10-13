import s from "./narrativa.module.css";

export function PorQueAntes() {
  return (
    <section className={`container ${s.secao}`} aria-labelledby="antes">
      <p className={s.rotulo}>por que vem antes</p>
      <h2 id="antes" className={s.titulo}>Começar pela estratégia não atrasa.</h2>
      <div className={s.duelo}>
        <div className={s.sem}><h3>Sem planejamento</h3><p>Você paga por posts sem direção, mede curtida em vez de resultado e conclui que “marketing não funciona”.</p></div>
        <div className={s.com}><h3>Com planejamento</h3><p>Você começa certo, e tudo que vier depois parte de uma base sólida.</p></div>
      </div>
      <p className={s.destaque}>É o que impede meses e dinheiro gastos na direção errada.</p>
    </section>
  );
}
