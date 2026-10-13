import s from "./Faixa.module.css";

const A = ["Sem achismo", "Sem improvisar", "Com direção estratégica"];
const B = ["Antes do primeiro post", "Planejamento estratégico de conteúdo", "Cacoal e região"];

function Trilho({ frases }: { frases: string[] }) {
  return (
    <div className={s.trilho} aria-hidden="true">
      {[0, 1].map((k) => (
        <ul key={k} className={s.grupo}>
          {[...frases, ...frases].map((f, i) => <li key={i}>{f}<span>✕</span></li>)}
        </ul>
      ))}
    </div>
  );
}

// Duas faixas cruzadas que correm em sentidos opostos. O sentido da página está nos títulos; isto é ritmo.
export function Faixa() {
  return (
    <div className={s.faixas} role="presentation">
      <p className={s.so}>{A.join(". ")}.</p>
      <div className={`${s.faixa} ${s.a}`}><Trilho frases={A} /></div>
      <div className={`${s.faixa} ${s.b}`}><Trilho frases={B} /></div>
    </div>
  );
}
