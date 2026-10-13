import s from "./narrativa.module.css";

export function OPlano() {
  return (
    <section className={`container ${s.secao}`} aria-labelledby="oplano">
      <p className={s.rotulo}>o planejamento</p>
      <h2 id="oplano" className={s.titulo}>O que é o planejamento estratégico de conteúdo?</h2>
      <p className={s.texto}>É a etapa que transforma a autoridade que você já tem em uma presença digital com direção. Antes de qualquer post, campanha ou perfil, definimos a base que vai orientar toda a comunicação daqui pra frente, para que cada conteúdo tenha função e cada real investido tenha propósito.</p>
      <p className={s.destaque}>Não é um documento bonito para engavetar. É o mapa que evita o retrabalho, o desperdício e o “postar por postar”.</p>
    </section>
  );
}
