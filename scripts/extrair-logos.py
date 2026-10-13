"""Extrai os logos de clientes da página 13 do PDF de planejamento, aplicando a
máscara de transparência (smask) de cada imagem, cortando a margem transparente e
reduzindo para no máximo 480 px.
Uso: python -I scripts/extrair-logos.py <pdf> <pasta-saida>
Ignora as imagens que não são logos (índices 0 = foto da Ariela, 6 = captura de tela, 48 = textura)."""
import io, sys, pymupdf
from PIL import Image

NAO_LOGOS = {0, 6, 48}
LARGURA_MAX = 480

pdf, saida = sys.argv[1], sys.argv[2]
d = pymupdf.open(pdf)
page = d[12]  # página 13
for i, im in enumerate(page.get_images(full=True)):
    if i in NAO_LOGOS:
        continue
    xref, smask = im[0], im[1]
    pix = pymupdf.Pixmap(d, xref)
    if pix.alpha:
        pix = pymupdf.Pixmap(pymupdf.csRGB, pix)
    if smask:
        pix = pymupdf.Pixmap(pix, pymupdf.Pixmap(d, smask))
    img = Image.open(io.BytesIO(pix.tobytes("png"))).convert("RGBA")
    # corta a transparência ao redor (alpha > 8) para o logo preencher o cartão
    caixa = img.getchannel("A").point(lambda v: 255 if v > 8 else 0).getbbox()
    if caixa:
        img = img.crop(caixa)
    img.thumbnail((LARGURA_MAX, LARGURA_MAX))
    img.save(f"{saida}/logo-{i:02d}.png", optimize=True)
    print(f"logo-{i:02d}.png", img.size)
