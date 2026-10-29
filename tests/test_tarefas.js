// Testes unitarios das funcoes de tarefas
function executarTestesTarefas() {
  console.log('Executando teste de tarefas...');
  const qtdInicial = listarTodasTarefas().length;
  const nova = adicionarTarefa('Tarefa Teste', 'Desc', 'geral', 'baixa', '');
  console.assert(nova && nova.id, 'Tarefa criada com ID!');
  excluirTarefa(nova.id);
  console.assert(listarTodasTarefas().length === qtdInicial, 'Tarefa excluida com sucesso!');
}
