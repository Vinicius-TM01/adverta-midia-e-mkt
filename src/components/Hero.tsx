import Image from "next/image";
import styles from "./Hero.module.css";
import { Nav } from "./Nav";
import { CtaWhatsApp } from "./CtaWhatsApp";

const PILARES = ["Posicionamento", "Público", "Jornada", "Territórios e temas", "Canais", "Indicadores"];

export function Hero() {
  return (
    <header className={styles.hero}>
      <Nav />
      <div className={styles.stage}>
        <div className={styles.texto}>
          <span className={styles.carimbo}>Ariela Felícia · Adverta</span>
          <h1 className={styles.h1}>
            <span className={styles.l}>Marketing não é</span>{" "}
            <span className={styles.l}>
              <span className={styles.corte} data-corrige="planejar">postar
                <svg viewBox="0 0 200 100" preserveAspectRatio="none" aria-hidden="true"><path d="M4 92 C60 70 130 30 196 6" /></svg>
              </span>{" "}mais.
            </span>{" "}
            <span className={`${styles.l} ${styles.alvo}`}>É saber por</span>{" "}
            <span className={`${styles.l} ${styles.alvo}`}>que postar.</span>
          </h1>
          <p className={styles.sub}>Planejamento estratégico de conteúdo para negócios em Cacoal e região. <em>Antes do primeiro post</em>, definimos o que comunicar, para quem e com qual objetivo.</p>
          <div className={styles.acoes}>
            <CtaWhatsApp className={styles.cta} />
            <a className={styles.teste} href="#teste">Fazer o teste do achismo</a>
          </div>
        </div>
        <figure className={styles.foto}>
          <span className={styles.fita} aria-hidden="true" />
          <div className={styles.papel}>
            <Image src="/ariela-estudio.jpg" alt="Ariela Felícia, estrategista de marketing e fundadora da Adverta, de blazer roxo" width={1200} height={1800} priority sizes="(max-width:900px) 84vw, 440px" />
            <figcaption className={styles.legenda}><span>Ariela Felícia</span><small>Fundadora · Adverta</small></figcaption>
          </div>
          <div className={`${styles.nota} ${styles.n1}`}><b>8</b><span>anos de estratégia</span></div>
          <div className={`${styles.nota} ${styles.n2}`}><b>+200</b><span>empresas atendidas</span></div>
        </figure>
      </div>
      <ul className={styles.margem} aria-label="O que o planejamento define">
        <li className={styles.rotulo}>o plano define:</li>
        {PILARES.map((p) => <li key={p}>{p}</li>)}
      </ul>
    </header>
  );
}
