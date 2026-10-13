import s from "./fechamento.module.css";
import { buildWhatsAppUrl, MENSAGENS } from "@/lib/whatsapp";

const ANO = 2026;

export function Fechamento() {
  return (
    <footer id="contato" className={`container ${s.fechamento}`}>
      <p className={s.rotulo} data-revela="escreve">próximo passo</p>
      <h2 className={s.titulo} data-revela="sobe">Uma conversa inicial para alinhar o início do planejamento.</h2>
      <a className={s.cta} href={buildWhatsAppUrl(MENSAGENS.inicial)}>Agendar conversa inicial →</a>
      <ul className={s.contatos}>
        <li><a href="mailto:arielafelicia@advertamkt.com.br">arielafelicia@advertamkt.com.br</a></li>
        <li><a href="https://www.instagram.com/adverta.mkt/">@adverta.mkt</a></li>
        <li>Rua Niterói, 1175, Novo Cacoal · Cacoal, RO</li>
      </ul>
      <p className={s.rodape}>© {ANO} Adverta · Ariela Felícia</p>
    </footer>
  );
}
