# HR Digital — site

Site institucional da **HR Digital** (O renascimento do marketing local), em Next.js 16 + TypeScript, com GSAP + ScrollTrigger e rolagem suave (Lenis).

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de produção (página estática)
```

## Estrutura

| Pasta | O que tem |
| --- | --- |
| `src/lib/site.ts` | **Todo o conteúdo**: textos, nichos da hero, serviços, FAQ, WhatsApp, Instagram |
| `src/sections/` | Uma seção por arquivo, na ordem da página (`src/app/page.tsx`) |
| `src/styles/` | CSS de cada seção; tokens de cor/tipografia em `src/app/globals.css` |
| `src/components/` | Nav, wordmark, ícones, rolagem suave, reveals e barra fixa do celular |
| `public/brand/` | Fênix da marca (recortada da arte oficial) |
| `public/img/` | Fotos (nichos e seções), já em WebP |

## Seções

1. **Hero** — palavra gigante do segmento atrás de um iPhone com a busca do Google (swipe/arrastar no celular, autoplay)
2. **A Subida** — seção fixa: a empresa sobe do 7º ao 1º lugar enquanto se rola
3. **O problema invisível** — números e dores
4. **Método VIDA** — anel desenhado pela rolagem
5. **Vendedor 24h** — interruptor OFF → ON e notificações
6. **Serviços** (bento) · 7. **Nichos** (faixas) · 8. **Como funciona**
9. **Fundador** · 10. **Resultados** · 11. **Agendamento** (mensagem pronta no WhatsApp) · 12. **FAQ** · 13. **Fechamento**

Com `prefers-reduced-motion`, as animações são desligadas e tudo aparece no estado final.
