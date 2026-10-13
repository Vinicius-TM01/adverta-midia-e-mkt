import s from "./narrativa.module.css";

const FRASE = "Postar sem direção gera movimento, mas não constrói autoridade.";

// Cada palavra acende em sequência quando a seção entra na tela; o texto inteiro está no HTML.
export function Virada() {
  return (
    <section className={`container ${s.virada}`} aria-label="A virada">
      <p className={s.viradaFrase} data-revela="palavras">
        {FRASE.split(" ").map((w, i) => (
          <span key={i} className="pal" style={{ "--i": i } as React.CSSProperties}>{w}{" "}</span>
        ))}
      </p>
      <p className={s.viradaFecho} data-revela="carimba" style={{ "--i": 9 } as React.CSSProperties}>E autoridade é o que vende.</p>
    </section>
  );
}
