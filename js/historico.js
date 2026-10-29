// Modulo de log e historico de operacoes
const CHAVE_HISTORICO = 'historico_tarefas_desktop';

function registrarAcaoHistorico(acao, nomeTarefa) {
  const lista = STORAGE_ENGINE.recuperar(CHAVE_HISTORICO, []);
  const novoLog = {
    id: Date.now(),
    data: new Date().toLocaleString('pt-BR'),
    acao: acao,
    tarefa: nomeTarefa
  };
  lista.unshift(novoLog);
  STORAGE_ENGINE.salvar(CHAVE_HISTORICO, lista.slice(0, 50));
}

function obterHistoricoCompleto() {
  return STORAGE_ENGINE.recuperar(CHAVE_HISTORICO, []);
}
