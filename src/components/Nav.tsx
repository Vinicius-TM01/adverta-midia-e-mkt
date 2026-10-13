import styles from "./Nav.module.css";
import { buildWhatsAppUrl, MENSAGENS } from "@/lib/whatsapp";

export function Nav() {
  return (
    <nav className={styles.nav} aria-label="Principal">
      <a className={styles.marca} href="#" aria-label="Adverta, início"><b aria-hidden="true">A</b>adverta</a>
      <ul>
        <li><a href="#planejamento">Planejamento</a></li>
        <li><a href="#sobre">Sobre</a></li>
        <li><a href="#contato">Contato</a></li>
      </ul>
      <a className={styles.pill} href={buildWhatsAppUrl(MENSAGENS.inicial)}>WhatsApp</a>
    </nav>
  );
}
