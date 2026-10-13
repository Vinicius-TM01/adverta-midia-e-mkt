import Image from "next/image";
import s from "./fechamento.module.css";
import { CLIENTES } from "@/content/clientes";

export function Prova() {
  return (
    <section className={`container ${s.prova}`} aria-labelledby="prova-t">
      <p className={s.rotulo} data-revela="escreve">quem já passou pelo mapa</p>
      <h2 id="prova-t" className={s.titulo} data-revela="sobe">+<span data-conta="200">200</span> empresas atendidas.</h2>
      <p className={s.texto} data-revela="sobe">Alguns dos negócios que já fizeram o caminho com a Adverta.</p>
      <ul className={s.logos}>
        {CLIENTES.map((c, i) => (
          <li key={c.arquivo} className={c.largo ? s.largo : undefined} data-revela="sobe" style={{ "--i": i % 6 } as React.CSSProperties}><Image src={`/clientes/${c.arquivo}`} alt={`Logo ${c.nome}, cliente da Adverta`} width={220} height={110} sizes="(max-width:420px) 140px, 280px" /></li>
        ))}
      </ul>
    </section>
  );
}
