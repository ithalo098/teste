// Modulo de filtros e busca dinamica de tarefas
let estadoFiltro = {
  texto: '',
  status: 'todas',
  prioridade: 'todas',
  categoria: 'todas'
};

function definirFiltroTexto(t) {
  estadoFiltro.texto = t.toLowerCase().trim();
}

function definirFiltroStatus(s) {
  estadoFiltro.status = s;
}

function definirFiltroPrioridade(p) {
  estadoFiltro.prioridade = p;
}

function filtrarTarefasColecao(lista) {
  return lista.filter(tarefa => {
    // 1. Filtro textual
    const bateTexto = !estadoFiltro.texto ||
      tarefa.titulo.toLowerCase().includes(estadoFiltro.texto) ||
      tarefa.descricao.toLowerCase().includes(estadoFiltro.texto);

    // 2. Filtro de status
    let bateStatus = true;
    if (estadoFiltro.status === 'pendentes') bateStatus = !tarefa.feita;
    if (estadoFiltro.status === 'concluidas') bateStatus = tarefa.feita;

    // 3. Filtro de prioridade
    let batePrioridade = true;
    if (estadoFiltro.prioridade !== 'todas') {
      batePrioridade = tarefa.prioridade === estadoFiltro.prioridade;
    }

    return bateTexto && bateStatus && batePrioridade;
  });
}
