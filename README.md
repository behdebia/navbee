# Site NAVBEE

Site institucional estático (HTML + CSS + JS puros). Estrutura:

```
index.html · 404.html · style.css · script.js
favicon.svg · og-image.png · robots.txt · sitemap.xml
assets/
  logo/   navbee-logo.svg|png (horizontal, transparente) · navbee-symbol.svg|png (mobile/ícone) · navbee-logo-on-black.png
  favicon-32.png · apple-touch-icon.png
tools/set-domain.py   (aplica o domínio definitivo)
```

## ⚠ Pendências que dependem de informações externas (site NÃO está pronto para produção)

1. **Domínio definitivo** — ainda não informado. Sem ele não existem `canonical`, `og:url`, `og:image`/`twitter:image` (exigem URL absoluta), `url`/`logo` do Schema.org, linha `Sitemap:` do robots.txt e a URL do sitemap.xml.
   Quando definido: `python3 tools/set-domain.py https://seu-dominio` (preenche tudo; pode rodar de novo).
2. **Endpoint do formulário** — `FORM_ENDPOINT` em `script.js` está vazio. O formulário valida, **não envia nada** e avisa o visitante. Configure um serviço de leads (Formspree, Getform, endpoint próprio) antes do lançamento.
3. **Contatos oficiais** (e-mail comercial, WhatsApp) — o texto atual já informa que serão divulgados depois; nenhum dado foi inventado.
4. **Política de Privacidade e Termos** — seção ainda é um aviso "em elaboração" (já era assim no original).
5. **Amarelo da logo × amarelo do site** — a logo enviada usa ≈ `#FCC506`; a identidade oficial define `#FFD21A`. Mantive a logo fiel ao arquivo enviado. Se quiser unificar, troque `#FCC506` por `#FFD21A` nos SVGs de `assets/logo/` e em `favicon.svg`.

## Alterações realizadas

- **Nome**: todas as ocorrências de NAVPEE → NAVBEE (títulos, textos, FAQ, consentimento do formulário, aria-labels, rodapé, metadados). Slogan antigo substituído por NAVIGATE • INNOVATE • EVOLVE.
- **Logo**: extraída do PNG oficial (fundo preto → transparência por canal alfa, sem redesenhar) e vetorizada por trace fiel para SVG. Versão horizontal (cabeçalho/rodapé/404) e versão símbolo+abelha para telas ≤ 480 px (`<picture>`). Símbolo usado também no hero.
- **style.css** reescrito: paleta preto/amarelo/branco, sem nenhum roxo/lilás/gradiente roxo; tema escuro único; botões amarelo+preto; cards com borda discreta; estados hover/focus/disabled/erro revisados; menu mobile; `prefers-reduced-motion` mantido.
- **index.html**: estrutura, navegação, serviços e âncoras preservados. Metadados SEO, Open Graph, Twitter Cards e Schema.org atualizados; `theme-color` #080808; favicon SVG + PNG + apple-touch-icon; fallback `<noscript>` para animações de entrada.
- **script.js**: nenhuma lógica removida (menu, indicador de seção, abas, pré-seleção de serviço, validação, honeypot, atraso anti-bot, timeout, mensagens). Adicionado aviso de pendência do endpoint (comentário + `console.warn`).
- **404.html**: nova identidade, logo, botão de retorno, responsivo, `noindex`.
- **favicon.svg**: símbolo oficial (setas + abelha) sobre preto; removido o manifesto C2PA embutido do original.
- **og-image.png** (1200×630): logo oficial + slogan sobre #080808.

## Verificações feitas (Chromium, desktop 1440 / tablet 820 / celular 390)

Sem erros de JavaScript · sem overflow horizontal · todas as imagens carregam · âncoras internas ok · menu mobile abre/fecha (clique e link) · abas com setas do teclado · pré-seleção de serviço · validação (vazio, e-mail, URL, mensagem curta, consentimento) · foco no 1º campo inválido · mensagem de "envio não ativo" · honeypot · 404 ok · busca por NAVPEE/cores antigas/domínio de exemplo: nenhum resultado.

Não verificado aqui: carregamento real das fontes do Google (sem internet no ambiente de teste — o site cai para fontes do sistema), e teste em dispositivos físicos / Safari.
