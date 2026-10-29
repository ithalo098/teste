# Roteiro de Estudo e Perguntas para a Apresentação

Este guia foi elaborado para que qualquer integrante do trio consiga explicar o código com confiança e clareza perante a banca avaliadora.

## Pergunta 1: Por que usamos o Electron?
**Resposta**: O Electron permite transformar tecnologias web (HTML, CSS e JavaScript) em um aplicativo desktop nativo para Windows. Ele une o motor do Chromium para desenhar a tela e o Node.js para controlar as janelas do sistema operacional.

## Pergunta 2: Por que usamos o Bootstrap 5?
**Resposta**: O Bootstrap agiliza a criação de uma interface limpa, moderna e responsiva. Usamos o sistema de Grid (`row` e `col`), cards (`card`), badges coloridas para prioridades e componentes interativos como Modais e Toasts.

## Pergunta 3: Onde os dados ficam salvos?
**Resposta**: Ficam salvos no `localStorage` do navegador em formato JSON através do módulo `storage.js`. Assim, quando o usuário fecha o aplicativo e abre novamente, todas as tarefas continuam salvas.

## Pergunta 4: Como funciona a busca em tempo real?
**Resposta**: O campo de pesquisa escuta o evento `input`. A cada letra digitada, o módulo `filtros.js` executa a função `filter()` do JavaScript comparando se o título ou a descrição contêm o texto digitado (`includes()`).
