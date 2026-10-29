# Documento de Planejamento do Projeto

## 1. Identificação do Trabalho
- **Curso**: Técnico em Informática / TI
- **Instituição**: Grau Técnico
- **Disciplina**: Desenvolvimento de Aplicações Desktop
- **Integrantes**: Íthalo (ithalo098) e trio

## 2. Proposta da Aplicação
Desenvolver um gerenciador de tarefas para computador voltado para o cotidiano do estudante técnico, integrando a flexibilidade do **Electron** para criar uma aplicação desktop com a agilidade do **Bootstrap 5** para a interface visual.

## 3. Fluxo de Trabalho do Usuário (Workflow)
1. **Entrada no Sistema**: O usuário abre a aplicação nativa no computador.
2. **Carregamento de Estado**: O sistema consulta o LocalStorage e carrega as tarefas salvas.
3. **Interação com a Interface**:
   - Criação de nova tarefa com formulário intuitivo.
   - Listagem instantânea organizada por cards com bordas coloridas de prioridade.
   - Filtragem rápida e busca por palavras-chave em tempo real.
   - Alteração de status (concluir/reabrir) com checkbox simples.
   - Edição de título, anotações ou prioridade via janela modal.
   - Exclusão com modal de confirmação para prevenir cliques acidentais.
4. **Persistência Transparente**: Toda alteração é salva automaticamente sem necessidade de botão "Salvar Tudo".
