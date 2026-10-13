"use client";
import { useEffect, useRef } from "react";

export function Rota() {
  const path = useRef<SVGPathElement>(null);
  useEffect(() => {
    const el = path.current;
    if (!el || typeof el.getTotalLength !== "function") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const len = el.getTotalLength();
    el.style.strokeDasharray = `${len}`;
    let quadro = 0;
    const draw = () => {
      quadro = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 1;
      el.style.strokeDashoffset = `${len * (1 - p)}`;
    };
    // Leitura de layout só dentro de requestAnimationFrame: evita reflow forçado na montagem e no scroll.
    const agendar = () => { if (!quadro) quadro = requestAnimationFrame(draw); };
    agendar();
    window.addEventListener("scroll", agendar, { passive: true });
    return () => {
      window.removeEventListener("scroll", agendar);
      if (quadro) cancelAnimationFrame(quadro);
    };
  }, []);
  return (
    <svg aria-hidden="true" viewBox="0 0 40 1000" preserveAspectRatio="none"
      style={{ position: "absolute", top: 0, bottom: 0, left: "calc(var(--pad) - 52px)", width: 40, height: "100%", pointerEvents: "none", zIndex: 1, display: "var(--rota-display, block)" }}>
      <path ref={path} d="M20 0 L4 90 L34 150 L6 230 L30 300 C28 420 20 480 20 560 L20 1000"
        fill="none" stroke="#FF6B1A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
