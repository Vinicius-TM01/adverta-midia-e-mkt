import { buildJsonLd, serializeJsonLd, SITE_URL } from "./seo";
import { FAQ } from "@/content/faq";

describe("buildJsonLd", () => {
  const g = buildJsonLd() as { "@graph": any[] };
  const por = (t: string) => g["@graph"].find((n) => n["@type"] === t);
  it("usa o nome com acento", () => {
    expect(por("Person").name).toBe("Ariela Felícia");
    expect(JSON.stringify(g)).not.toMatch(/Ariela Felicia/);
  });
  it("ProfessionalService tem URL, telefone e cidade", () => {
    const n = por("ProfessionalService");
    expect(n.url).toBe(SITE_URL);
    expect(n.telephone).toBe("+55 69 98448-8703");
    expect(n.address.addressLocality).toBe("Cacoal");
  });
  it("FAQPage espelha o FAQ visível", () => {
    const f = por("FAQPage");
    expect(f.mainEntity).toHaveLength(FAQ.length);
    expect(f.mainEntity[0].acceptedAnswer.text).toBe(FAQ[0].resposta);
  });
  it("não declara avaliações nem preços", () => {
    const s = JSON.stringify(g);
    expect(s).not.toMatch(/aggregateRating|review|priceRange|offers/i);
  });
});

describe("serializeJsonLd", () => {
  it("escapa < para impedir fechamento antecipado do script", () => {
    const out = serializeJsonLd({ nome: "</script><b>x" });
    expect(out).not.toContain("<");
    expect(JSON.parse(out).nome).toBe("</script><b>x");
  });
});
