"""Gera favicon, ícones e imagem de compartilhamento do site a partir do logo e da foto reais da Adverta.
Saída em src/app: favicon.ico, icon.png, apple-icon.png, opengraph-image.png, twitter-image.png.
Uso: python scripts/gerar_icones.py <logo branco png>"""
import base64, io, pathlib, shutil, sys
import numpy as np, potrace
from PIL import Image
from playwright.sync_api import sync_playwright
from rembg import new_session, remove

R = pathlib.Path(__file__).resolve().parent.parent; APP = R / "src" / "app"; CACHE = R / "scripts" / ".cache"
FUNDO, ROXO, VIVO, CLARO, TEXTO, MARCA, TINTA = "#0E0719", "#6A24B0", "#8B3FD9", "#B58BE6", "#F1EAFB", "#FFD43B", "#1E0F33"

def tracar(alfa, k=6):
    """Contorno vetorial do alfa, para o logo de 236 px não serrilhar quando ampliado."""
    a = alfa.resize((alfa.width * k, alfa.height * k), Image.LANCZOS)
    d = []
    for c in potrace.Bitmap(np.asarray(a) <= 127).trace(turdsize=4, alphamax=1.0, opttolerance=.3):
        p = c.start_point; d.append(f"M{p.x / k:.2f} {p.y / k:.2f}")
        for s in c.segments:
            e = s.end_point
            if s.is_corner: d.append(f"L{s.c.x / k:.2f} {s.c.y / k:.2f}L{e.x / k:.2f} {e.y / k:.2f}")
            else: d.append(f"C{s.c1.x / k:.2f} {s.c1.y / k:.2f} {s.c2.x / k:.2f} {s.c2.y / k:.2f} {e.x / k:.2f} {e.y / k:.2f}")
        d.append("Z")
    return "".join(d)

def svg(d, w, h, estilo):
    return f'<svg viewBox="0 0 {w} {h}" style="{estilo}"><path fill="#fff" fill-rule="evenodd" d="{d}"/></svg>'

def recorte_ariela():
    CACHE.mkdir(exist_ok=True); f = CACHE / "ariela_recorte.png"
    if not f.exists():
        remove(Image.open(R / "public" / "ariela-estudio.jpg").convert("RGB"), session=new_session("birefnet-portrait")).save(f)
    return "data:image/png;base64," + base64.b64encode(f.read_bytes()).decode()

def icone(simbolo, lado, raio, fundo=None):
    fundo = fundo or f"linear-gradient(145deg,{VIVO},{ROXO})"
    return (f'<!doctype html><style>*{{margin:0}}html,body{{width:{lado}px;height:{lado}px;background:transparent}}</style>'
            f'<div style="width:{lado}px;height:{lado}px;border-radius:{raio}px;background:{fundo};display:flex;align-items:center;justify-content:center">{simbolo}</div>')

def compartilhamento(logo, foto):
    return f"""<!doctype html><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,800&family=IBM+Plex+Mono&display=swap" rel="stylesheet">
<style>*{{margin:0;padding:0;box-sizing:border-box}}html,body{{width:1200px;height:630px;overflow:hidden}}
.pg{{position:relative;width:1200px;height:630px;overflow:hidden;background:radial-gradient(620px 560px at 930px 300px,{ROXO} 0,rgba(106,36,176,.35) 52%,transparent 76%),{FUNDO};font-family:'Bricolage Grotesque',sans-serif;color:{TEXTO}}}
.foto{{position:absolute;left:640px;top:24px;width:560px;height:auto}}
.base{{position:absolute;left:0;right:0;bottom:0;height:90px;background:linear-gradient(0deg,{FUNDO},transparent)}}
h1{{position:absolute;left:64px;top:158px;font-weight:800;font-size:72px;line-height:1;letter-spacing:-.04em}}
h1 span{{display:block;white-space:nowrap}}h1 .m{{width:max-content;background:{MARCA};color:{TINTA};padding:2px 12px 6px;margin:6px 0 0 -12px;transform:rotate(-.8deg)}}
p{{position:absolute;left:64px;bottom:64px;width:560px;font:400 21px/1.35 'IBM Plex Mono',monospace;color:{CLARO}}}</style>
<div class="pg"><img class="foto" src="{foto}"><div class="base"></div>{logo}
<h1><span>Marketing não é</span><span>postar mais.</span><span class="m">É saber por</span><span class="m">que postar.</span></h1>
<p>Planejamento estratégico de conteúdo em Cacoal e região.</p></div>"""

if __name__ == "__main__":
    im = Image.open(sys.argv[1]).convert("RGBA"); W, H = im.size; a = im.getchannel("A")
    SW = 165                                                    # largura do símbolo (cubo) no logo
    logo_d, simb_d = tracar(a), tracar(a.crop((0, 0, SW, H)))
    with sync_playwright() as pw:
        br = pw.chromium.launch(channel="chrome")
        def foto_de(html, lado, destino):
            pg = br.new_page(viewport={"width": lado, "height": lado}); pg.set_content(html)
            pg.screenshot(path=str(destino), omit_background=True); pg.close()
        grande = svg(simb_d, SW, H, "height:74%;width:auto")
        foto_de(icone(grande, 512, 112), 512, APP / "icon.png")
        foto_de(icone(grande, 180, 0, ROXO), 180, APP / "apple-icon.png")
        Image.open(APP / "apple-icon.png").convert("RGB").save(APP / "apple-icon.png")   # iOS não aceita transparência
        foto_de(icone(svg(simb_d, SW, H, "height:84%;width:auto"), 256, 52), 256, CACHE / "fav.png")
        Image.open(CACHE / "fav.png").save(APP / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
        pg = br.new_page(viewport={"width": 1200, "height": 630})
        pg.set_content(compartilhamento(svg(logo_d, W, H, "position:absolute;left:64px;top:60px;width:230px;height:auto"), recorte_ariela()))
        pg.wait_for_load_state("networkidle"); pg.evaluate("document.fonts.ready"); pg.wait_for_timeout(300)
        print("fonte:", pg.evaluate("document.fonts.check(\"800 72px 'Bricolage Grotesque'\")"))
        pg.screenshot(path=str(APP / "opengraph-image.png")); br.close()
    shutil.copy(APP / "opengraph-image.png", APP / "twitter-image.png")
    alt = "Adverta: marketing não é postar mais, é saber por que postar. Ariela Felícia, fundadora."
    for n in ("opengraph-image", "twitter-image"): (APP / f"{n}.alt.txt").write_text(alt, encoding="utf-8")
