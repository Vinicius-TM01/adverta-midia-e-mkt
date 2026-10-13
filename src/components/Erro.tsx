import s from "./narrativa.module.css";

export function Erro() {
  return (
    <section className={`container ${s.secao}`} aria-labelledby="erro">
      <p className={s.rotulo}>o erro</p>
      <h2 id="erro" className={s.titulo}>Sua presença digital está começando agora.</h2>
      <p className={s.texto}>E o passo natural parece ser “começar a postar”: abrir o perfil, contratar alguém, produzir conteúdo.</p>
      <p className={s.texto}><mark>Mas é aí que a maioria começa errado:</mark> pela execução, sem antes definir o que comunicar, para quem, com qual posicionamento e objetivo.</p>
    </section>
  );
}
