import { Hero } from "@/components/Hero";
import { Erro } from "@/components/Erro";
import { Virada } from "@/components/Virada";
import { OPlano } from "@/components/OPlano";
import { Pilares } from "@/components/Pilares";
import { PorQueAntes } from "@/components/PorQueAntes";
import { Teste } from "@/components/Teste";
import { Rota } from "@/components/Rota";

export default function Home() {
  return (
    <main className="papel" style={{ position: "relative" }}>
      <Rota />
      <Hero />
      <Erro />
      <Virada />
      <OPlano />
      <Pilares />
      <PorQueAntes />
      <Teste />
    </main>
  );
}
