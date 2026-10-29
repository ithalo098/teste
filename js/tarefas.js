// Modulo de gerenciamento e operacoes CRUD de tarefas
// Controla criacao, leitura, atualizacao e exclusao de tarefas

let colecaoTarefas = [];

function inicializarModuloTarefas() {
  const dados = STORAGE_ENGINE.recuperar(CONFIG_APP.chaveStorage);
  if (dados && Array.isArray(dados) && dados.length > 0) {
    colecaoTarefas = dados;
  } else {
    colecaoTarefas = obterTarefasPadraoIniciais();
    STORAGE_ENGINE.salvar(CONFIG_APP.chaveStorage, colecaoTarefas);
  }
}

function listarTodasTarefas() {
  return colecaoTarefas;
}

function adicionarTarefa(titulo, descricao, categoria, prioridade, dataLimite) {
  const nova = {
    id: 't_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
    titulo: titulo.trim(),
    descricao: descricao ? descricao.trim() : '',
    categoria: categoria || 'geral',
    prioridade: prioridade || 'media',
    dataLimite: dataLimite || '',
    feita: false,
    criadaEm: new Date().toISOString()
  };

  colecaoTarefas.unshift(nova);
  STORAGE_ENGINE.salvar(CONFIG_APP.chaveStorage, colecaoTarefas);
  return nova;
}

function alternarConclusao(id) {
  const tarefa = colecaoTarefas.find(t => t.id === id);
  if (tarefa) {
    tarefa.feita = !tarefa.feita;
    STORAGE_ENGINE.salvar(CONFIG_APP.chaveStorage, colecaoTarefas);
    return tarefa;
  }
  return null;
}

function excluirTarefa(id) {
  colecaoTarefas = colecaoTarefas.filter(t => t.id !== id);
  STORAGE_ENGINE.salvar(CONFIG_APP.chaveStorage, colecaoTarefas);
}

function atualizarTarefaExistente(id, novosDados) {
  const tarefa = colecaoTarefas.find(t => t.id === id);
  if (tarefa) {
    if (novosDados.titulo) tarefa.titulo = novosDados.titulo.trim();
    if (novosDados.descricao !== undefined) tarefa.descricao = novosDados.descricao.trim();
    if (novosDados.categoria) tarefa.categoria = novosDados.categoria;
    if (novosDados.prioridade) tarefa.prioridade = novosDados.prioridade;
    if (novosDados.dataLimite !== undefined) tarefa.dataLimite = novosDados.dataLimite;
    
    STORAGE_ENGINE.salvar(CONFIG_APP.chaveStorage, colecaoTarefas);
    return true;
  }
  return false;
}

function removerTodasConcluidas() {
  colecaoTarefas = colecaoTarefas.filter(t => !t.feita);
  STORAGE_ENGINE.salvar(CONFIG_APP.chaveStorage, colecaoTarefas);
}
