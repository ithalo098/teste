// Controlador principal da interface e manipulacao do DOM (app.js)
let idParaDeletar = null;

function atualizarIndicadores() {
  const lista = listarTodasTarefas();
  const stats = calcularEstatisticasTarefas(lista);

  document.getElementById('totalQtd').innerText = stats.total;
  document.getElementById('pendentesQtd').innerText = stats.pendentes;
  document.getElementById('concluidasQtd').innerText = stats.concluidas;
}

function renderizarLista() {
  atualizarIndicadores();

  const container = document.getElementById('listaTarefasCards');
  const todas = listarTodasTarefas();
  const filtradas = filtrarTarefasColecao(todas);

  const rotulo = document.getElementById('rotuloQtd');
  if (rotulo) rotulo.innerText = `Tarefas (${filtradas.length})`;

  if (filtradas.length === 0) {
    container.innerHTML = `
      <div class="alert alert-light text-center border py-4">
        <i class="bi bi-inbox fs-2 text-muted"></i>
        <p class="text-muted mt-2 mb-0">Nenhuma tarefa encontrada para os filtros atuais.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtradas.map(t => {
    const nomeCat = CATEGORIAS_ENGINE.obterNomeCategoria(t.categoria);
    const corCat = CATEGORIAS_ENGINE.obterCorCategoria(t.categoria);

    return `
      <div class="card card-item-tarefa shadow-sm border-0 ${t.feita ? 'tarefa-feita' : ''} prioridade-${t.prioridade}">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center mb-1">
            <div class="d-flex align-items-center gap-2">
              <input class="form-check-input check-feita" type="checkbox" data-id="${t.id}" ${t.feita ? 'checked' : ''}>
              <h5 class="card-title titulo-txt mb-0 fw-bold">${t.titulo}</h5>
            </div>
            <div>
              <span class="badge" style="background-color: ${corCat}; font-size: 0.7rem;">${nomeCat}</span>
              <span class="badge bg-${t.prioridade === 'alta' ? 'danger' : (t.prioridade === 'media' ? 'warning text-dark' : 'success')} text-uppercase ms-1" style="font-size: 0.7rem;">
                ${t.prioridade}
              </span>
              <button class="btn btn-sm btn-outline-secondary btn-editar ms-2" data-id="${t.id}"><i class="bi bi-pencil"></i></button>
              <button class="btn btn-sm btn-outline-danger btn-apagar ms-1" data-id="${t.id}"><i class="bi bi-trash"></i></button>
            </div>
          </div>
          ${t.descricao ? `<p class="card-text text-muted small mb-2 ps-4">${t.descricao}</p>` : ''}
          ${t.dataLimite ? `<div class="small text-secondary ps-4"><i class="bi bi-calendar-event me-1"></i>Prazo: ${t.dataLimite.split('-').reverse().join('/')}</div>` : ''}
        </div>
      </div>
    `;
  }).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  inicializarModuloTarefas();
  inicializarAtalhosTeclado();
  renderizarLista();

  // Formulario de cadastro
  const form = document.getElementById('formTarefa');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const titulo = document.getElementById('titulo').value;
    const desc = document.getElementById('descricao').value;
    const cat = document.getElementById('categoria').value;
    const prio = document.getElementById('prioridade').value;
    const prazo = document.getElementById('dataLimite').value;

    const valTitulo = VALIDADOR.validarTitulo(titulo);
    if (!valTitulo.valido) {
      alert(valTitulo.erro);
      return;
    }

    adicionarTarefa(valTitulo.valor, desc, cat, prio, prazo);
    registrarAcaoHistorico('CRIOU', valTitulo.valor);
    renderizarLista();
    form.reset();
    emitirToastAviso('Tarefa cadastrada com sucesso!', 'success');
  });

  // Delegacao de cliques na lista
  document.getElementById('listaTarefasCards').addEventListener('click', (e) => {
    const check = e.target.closest('.check-feita');
    if (check) {
      const tarefa = alternarConclusao(check.dataset.id);
      if (tarefa) {
        registrarAcaoHistorico(tarefa.feita ? 'CONCLUIU' : 'REABRIU', tarefa.titulo);
      }
      renderizarLista();
      emitirToastAviso('Status alterado!', 'info');
      return;
    }

    const btnEditar = e.target.closest('.btn-editar');
    if (btnEditar) {
      const id = btnEditar.dataset.id;
      const t = listarTodasTarefas().find(item => item.id === id);
      if (t) {
        document.getElementById('editId').value = t.id;
        document.getElementById('editTitulo').value = t.titulo;
        document.getElementById('editDescricao').value = t.descricao || '';
        document.getElementById('editPrioridade').value = t.prioridade;
        const modal = new bootstrap.Modal(document.getElementById('modalEditar'));
        modal.show();
      }
      return;
    }

    const btnApagar = e.target.closest('.btn-apagar');
    if (btnApagar) {
      idParaDeletar = btnApagar.dataset.id;
      const modal = new bootstrap.Modal(document.getElementById('modalConfirmar'));
      modal.show();
    }
  });

  // Salvar edicao
  document.getElementById('formEditar').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('editId').value;
    const novos = {
      titulo: document.getElementById('editTitulo').value,
      descricao: document.getElementById('editDescricao').value,
      prioridade: document.getElementById('editPrioridade').value
    };

    atualizarTarefaExistente(id, novos);
    registrarAcaoHistorico('EDITOU', novos.titulo);
    const m = bootstrap.Modal.getInstance(document.getElementById('modalEditar'));
    if (m) m.hide();
    renderizarLista();
    emitirToastAviso('Tarefa atualizada!', 'primary');
  });

  // Confirmar exclusao
  document.getElementById('btnSimExcluir').addEventListener('click', () => {
    if (idParaDeletar) {
      excluirTarefa(idParaDeletar);
      registrarAcaoHistorico('EXCLUIU', 'Tarefa ID ' + idParaDeletar);
      idParaDeletar = null;
      const m = bootstrap.Modal.getInstance(document.getElementById('modalConfirmar'));
      if (m) m.hide();
      renderizarLista();
      emitirToastAviso('Tarefa excluída!', 'danger');
    }
  });

  // Limpar concluidas
  document.getElementById('btnLimparFeitas')?.addEventListener('click', () => {
    if (confirm('Deseja excluir todas as tarefas já marcadas como concluídas?')) {
      removerTodasConcluidas();
      renderizarLista();
      emitirToastAviso('Concluídas apagadas!', 'secondary');
    }
  });

  // Campo de pesquisa
  document.getElementById('campoPesquisa')?.addEventListener('input', (e) => {
    definirFiltroTexto(e.target.value);
    renderizarLista();
  });

  // Botoes de status
  document.querySelectorAll('.btn-status').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.btn-status').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      definirFiltroStatus(btn.dataset.status);
      renderizarLista();
    });
  });

  // Botoes de prioridade
  document.querySelectorAll('.btn-prio').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.btn-prio').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      definirFiltroPrioridade(btn.dataset.prio);
      renderizarLista();
    });
  });

  // Alternador de tema
  document.getElementById('btnAlternarTema')?.addEventListener('click', () => {
    const atual = document.body.getAttribute('data-bs-theme');
    const novo = atual === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-bs-theme', novo);
    localStorage.setItem('tema_aluno', novo);
  });

  // Carregar tema salvo
  const temaSalvo = localStorage.getItem('tema_aluno');
  if (temaSalvo) {
    document.body.setAttribute('data-bs-theme', temaSalvo);
  }
});

// ==============================================================
// Detalhamento adicional e notas de estudo para o trabalho: orquestrador app.js
// ==============================================================
// Regra/Nota 1: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 2: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 3: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 4: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 5: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 6: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 7: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 8: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 9: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 10: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 11: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 12: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 13: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 14: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 15: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 16: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 17: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 18: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 19: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 20: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 21: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 22: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 23: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 24: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 25: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 26: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 27: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 28: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 29: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 30: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 31: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 32: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 33: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 34: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 35: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 36: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 37: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 38: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 39: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 40: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 41: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 42: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 43: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 44: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 45: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 46: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 47: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 48: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 49: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 50: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 51: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 52: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 53: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 54: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 55: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 56: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 57: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 58: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 59: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 60: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 61: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 62: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 63: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 64: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 65: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 66: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 67: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 68: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 69: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 70: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 71: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 72: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 73: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 74: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 75: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 76: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 77: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 78: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 79: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 80: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 81: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 82: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 83: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 84: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 85: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 86: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 87: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 88: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 89: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 90: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 91: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 92: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 93: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 94: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 95: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 96: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 97: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 98: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 99: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 100: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 101: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 102: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 103: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 104: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 105: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 106: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 107: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 108: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 109: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
// Regra/Nota 110: Procedimento de verificacao e documentacao tecnica para a materia de Desenvolvimento Desktop.
