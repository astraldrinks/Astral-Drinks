# Astral Drinks — pacote completo (21 arquivos)

Arquivos destinados à **raiz** do repositório `astraldrinks/Astral-Drinks`, branch `main`, GitHub Pages `/(root)`.

Domínio personalizado: `www.astraldrinks.com.br` (`CNAME` já incluído).

## Conteúdo
- Cinco imagens novas: app, desktop, celular, tablet horizontal e tablet vertical.
- Seis áreas clicáveis sobre os botões impressos nas imagens.
- Links em `app-config.js` (Produtos atualizado sem âncora).
- `hotspots.json` é um mapa de referência; o `app.js` inclui as mesmas coordenadas para funcionar sem requisições adicionais.
- PWA/ícones/`sw.js`/`offline.html` preservados. **O service worker não é registrado automaticamente**, evitando conteúdo antigo em cache durante publicação. O manifest e ícones continuam disponíveis.
- Não existe pasta `assets` e todos os caminhos são relativos à raiz.

## Importante para substituir a versão antiga
Faça backup do repositório, remova arquivos antigos com nomes incorretos/duplicados e envie **os arquivos extraídos**, não o ZIP. Arquivos ocultos `.nojekyll` podem não aparecer no Explorer com a opção de arquivos ocultos desligada.

O ZIP não pode corrigir sozinho um GitHub Pages que não concluiu o deploy. Confira `Settings → Pages`, `Actions` e `Environments → github-pages` após o commit. Teste os 6 botões em desktop, celular e tablet.
