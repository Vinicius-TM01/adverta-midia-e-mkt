"use client";
import { useEffect } from "react";
import { ponteiroRelativo, puxao, valorContagem } from "@/lib/movimento";

// Camada de vida da página: revela seções ao rolar, conta números e reage ao cursor.
// O texto sempre existe no HTML do servidor; sem JS ou com movimento reduzido nada fica escondido.
export function Movimento() {
  useEffect(() => {
    document.documentElement.dataset.vivo = "";
    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revelaveis = Array.from(document.querySelectorAll<HTMLElement>("[data-revela]"));
    const contadores = Array.from(document.querySelectorAll<HTMLElement>("[data-conta]"));

    if (reduzido || typeof IntersectionObserver === "undefined") {
      revelaveis.forEach((el) => el.classList.add("visto"));
      return;
    }

    const contar = (el: HTMLElement) => {
      const alvo = Number(el.dataset.conta);
      const ini = performance.now();
      const passo = (agora: number) => {
        const t = (agora - ini) / 1200;
        el.textContent = String(valorContagem(t, alvo));
        if (t < 1) requestAnimationFrame(passo);
      };
      requestAnimationFrame(passo);
    };
    contadores.forEach((el) => { el.textContent = "0"; });

    const obs = new IntersectionObserver((entradas) => {
      entradas.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target as HTMLElement;
        el.classList.add("visto");
        el.querySelectorAll<HTMLElement>("[data-conta]").forEach(contar);
        obs.unobserve(el);
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
    revelaveis.forEach((el) => obs.observe(el));

    // Cursor: só em dispositivo com mouse.
    const mouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let limpa = () => {};
    if (mouse) {
      const hero = document.getElementById("inicio");
      const imas = Array.from(document.querySelectorAll<HTMLElement>("[data-magnetico]"));
      let quadro = 0;
      let px = 0;
      let py = 0;
      const aplicar = () => {
        quadro = 0;
        if (hero) {
          const r = hero.getBoundingClientRect();
          if (py >= r.top && py <= r.bottom) {
            const p = ponteiroRelativo(px, py, r);
            hero.style.setProperty("--mx", `${((p.x + 1) / 2) * 100}%`);
            hero.style.setProperty("--my", `${((p.y + 1) / 2) * 100}%`);
            hero.style.setProperty("--tx", p.x.toFixed(3));
            hero.style.setProperty("--ty", p.y.toFixed(3));
          }
        }
        imas.forEach((el) => {
          const p = puxao(px, py, el.getBoundingClientRect(), 90, 7);
          el.style.setProperty("--ix", `${p.x}px`);
          el.style.setProperty("--iy", `${p.y}px`);
        });
      };
      const mover = (e: PointerEvent) => {
        px = e.clientX;
        py = e.clientY;
        if (!quadro) quadro = requestAnimationFrame(aplicar);
      };
      window.addEventListener("pointermove", mover, { passive: true });
      limpa = () => { window.removeEventListener("pointermove", mover); if (quadro) cancelAnimationFrame(quadro); };
    }
    return () => { obs.disconnect(); limpa(); };
  }, []);
  return null;
}
