import s from "./narrativa.module.css";

export function PorQueAntes() {
  return (
    <section className={`container ${s.secao}`} aria-labelledby="antes">
      <p className={s.rotulo} data-revela="escreve">por que vem antes</p>
      <h2 id="antes" className={s.titulo} data-revela="sobe">Começar pela estratégia não atrasa.</h2>
      <div className={s.duelo}>
        <div className={s.sem} data-revela="sobe"><h3>Sem planejamento</h3><p>Você paga por posts sem direção, mede curtida em vez de resultado e conclui que “marketing não funciona”.</p></div>
        <div className={s.com} data-revela="sobe" style={{ "--i": 3 } as React.CSSProperties}><h3>Com planejamento</h3><p>Você começa certo, e tudo que vier depois parte de uma base sólida.</p></div>
      </div>
      <p className={s.destaque} data-revela="sobe">É o que impede meses e dinheiro gastos na direção errada.</p>
    </section>
  );
}
