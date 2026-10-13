import Image from "next/image";
import s from "./fechamento.module.css";

export function Sobre() {
  return (
    <section id="sobre" className={`container ${s.sobre}`} aria-labelledby="sobre-t">
      <figure className={s.sobreFoto}>
        <Image src="/ariela-evento.jpg" alt="Ariela Felícia em um evento de marketing, de blazer roxo, diante do notebook" width={1400} height={1740} sizes="(max-width:900px) 84vw, 420px" />
      </figure>
      <div>
        <p className={s.rotulo}>quem está do outro lado</p>
        <h2 id="sobre-t" className={s.titulo}>Sou Ariela Felícia, estrategista de marketing e fundadora da Adverta.</h2>
        <p className={s.texto}>Com 8 anos de experiência, ajudo negócios locais a saírem do improviso e executarem estratégias de marketing com direção, processo e resultado real.</p>
        <p className={s.texto}><mark>Não entrego apenas um planejamento.</mark> Fico ao lado do negócio durante a execução, porque estratégia sem acompanhamento não acontece.</p>
        <p className={s.credencial}>Administradora · CRA/RO 5702 · Mentoranda de Rafael Kiso (mLabs) · Social Media Lab Pro</p>
      </div>
    </section>
  );
}
