# Refactor — Hero / Portfolio / fluxo de layers

## Estrutura atual

1. Hero (canvas estável)
2. Portfolio (painel independente atrás do Hero, no mesmo canvas estável)
3. Depoimentos
4. Formulário / contato
5. About

`Service` e `Process` foram removidos do fluxo e seus módulos/ativos não utilizados também foram excluídos.

## Intro

- Texto 1 mantém a entrada existente.
- Texto 2 (`SESSÕES`) mantém reveal, subida e redução.
- O blur/escurecimento do Hero foi preservado.
- A transição do Hero continua usando `yPercent: -100`.
- O Portfolio não pertence mais ao `HeroSection`.
- O grid do Portfolio é movido verticalmente dentro do canvas estável, sem alterar a altura do layer durante show/hide das barras do Safari.

## Portfolio

- Novo `PortfolioSection.astro`.
- Layout em blocos sem gap, inspirado na referência enviada.
- 2 colunas no mobile e 4 no desktop.
- O painel permanece preso à geometria `100svh` capturada pela Intro; `100dvh` é usado apenas como superfície visual de cobertura.
- Imagens continuam com `loading=lazy`, `decoding=async` e `fetchpriority=low`.

## About

- Foi removido da timeline crítica da Intro.
- Agora aparece depois do formulário.
- Reveal da imagem, textos e troca para a segunda foto foram mantidos em uma timeline secundária própria (`aboutExperience.js`).

## Limpeza de peso

Foram removidos:

- vídeos do Process;
- `hero-mobile.webm` não utilizado;
- versões JPG de testimonials não utilizadas;
- versões JPG antigas do About;
- componentes/scripts/dados de Service e Process;
- arquivos de debug sem import ativo.

`paula.webp` foi redimensionada de 4000x6000 para 1200x1800.

## Validação

- Todos os arquivos JavaScript passaram em `node --check`.
- Foi feita busca por imports/referências removidas.
- O build Astro não pôde ser concluído neste ambiente porque o registry do npm falhou por DNS (`EAI_AGAIN`) durante `npm ci`. Rodar localmente:

```sh
npm ci
npm run build
```

## Testes de dispositivo recomendados

1. iPhone Safari com barra inferior visível.
2. Scroll rápido durante show/hide da toolbar.
3. Hero -> Texto 2 -> Portfolio, observando qualquer seam na transição.
4. Chegar ao último bloco do Portfolio e confirmar a entrada de Depoimentos.
5. Formulário -> About.
6. Rotação portrait/landscape antes de iniciar o scroll.

## Ajustes de ritmo e transição — 2026-09-22

- Texto 2 e subida do Hero agora se sobrepõem levemente; o efeito janela começa quase imediatamente após o movimento do título.
- Portfolio recalibrado para consumir menos scroll físico por pixel percorrido pelo grid, removendo a sensação de desaceleração excessiva.
- Adicionada ponte visual animada no fim do Portfolio, terminando em `#292929`, a mesma cor inicial de Testimonials.
- Aviso inferior simplificado para cookies e expandido para 100% da largura, usando `var(--color-light)`, igual ao fundo do About.

## Ajuste de transição — v3

- Portfolio e Testimonials agora usam o mesmo fundo (`var(--color-deep)`), sem gradiente de conexão entre os layers.
- A camada `portfolio-exit-transition` foi removida do DOM, CSS e timeline.
- `SESSÕES` não sobe mais e não reduz de escala antes da transição.
- A janela do Hero começa a fechar logo após a entrada de `SESSÕES`.
- Pouco antes do fechamento completo, `SESSÕES` fecha com `clip-path: inset(0% 0% 100% 0%)`, reproduzindo a direção usada no fechamento dos antigos cards do carrossel.
- A distância física reservada ao Hero foi recalibrada para preservar a velocidade percebida do Portfolio após a simplificação da timeline.

