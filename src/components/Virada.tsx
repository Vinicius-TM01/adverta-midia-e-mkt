import s from "./narrativa.module.css";

export function Virada() {
  return (
    <section className={`container ${s.virada}`} aria-label="A virada">
      <p className={s.viradaFrase}>Postar sem direção gera movimento, mas não constrói autoridade.</p>
      <p className={s.viradaFecho}>E autoridade é o que vende.</p>
    </section>
  );
}
