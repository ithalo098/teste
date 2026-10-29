// Controlador principal da interface e manipulacao do DOM (app.js)
// Versao NEXUS AI 2.0 - Interface Futurista & Super Funcional
let idParaDeletar = null;

function atualizarIndicadores() {
  const lista = listarTodasTarefas();
  const stats = calcularEstatisticasTarefas(lista);

  const elTotal = document.getElementById('totalQtd');
  const elPend = document.getElementById('pendentesQtd');
  const elConc = document.getElementById('concluidasQtd');

  if (elTotal) elTotal.innerText = stats.total;
  if (elPend) elPend.innerText = stats.pendentes;
  if (elConc) elConc.innerText = stats.concluidas;

  const pctConc = stats.total > 0 ? Math.round((stats.concluidas / stats.total) * 100) : 0;
  const pctPend = stats.total > 0 ? Math.round((stats.pendentes / stats.total) * 100) : 0;

  const barConc = document.querySelector('.hud-lizard-concluidas .hud-micro-fill');
  const barPend = document.querySelector('.hud-lizard-pendentes .hud-micro-fill');

  if (barConc) barConc.style.width = `${pctConc}%`;
  if (barPend) barPend.style.width = `${pctPend}%`;
}

function renderizarLista() {
  atualizarIndicadores();

  const container = document.getElementById('listaTarefasCards');
  if (!container) return;

  const todas = listarTodasTarefas();
  const filtradas = filtrarTarefasColecao(todas);

  const rotulo = document.getElementById('rotuloQtd');
  if (rotulo) rotulo.innerText = `Tarefas Detectadas (${filtradas.length})`;

  if (filtradas.length === 0) {
    container.innerHTML = `
      <div class="smart-liger-parent">
        <div class="smart-liger-card">
          <div class="smart-liger-glass text-center p-5">
            <div class="smart-liger-content">
              <i class="bi bi-shield-check text-white fs-1 opacity-75 mb-3 d-block"></i>
              <h5 class="fw-bold text-white mb-1">Nenhum Registro no Radar</h5>
              <p class="text-secondary small mb-3">Nenhuma tarefa corresponde aos filtros cibernéticos atuais.</p>
              <button class="btn-nexus-primary btn-sm" onclick="NEXUS_AI.executarSugestaoEstudos()">
                <i class="bi bi-lightning-charge-fill me-1"></i>
                <span>Sugerir Tarefas com IA</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    return;
  }

  // Renderiza todos os cards de atividade no modelo 3D Glassmorphism (Smit-Prajapati/smart-liger-5)
  // com toggle inspirado em Shammy2002/evil-shrimp-6
  // e botoes inspirados em Kabak/unlucky-treefrog-77
  container.innerHTML = filtradas.map(t => {
    const nomeCat = CATEGORIAS_ENGINE.obterNomeCategoria(t.categoria);
    const prazoFmt = t.dataLimite ? t.dataLimite.split('-').reverse().join('/') : null;

    let prioBadgeClass = 'cyber-badge-media';
    if (t.prioridade === 'alta') prioBadgeClass = 'cyber-badge-alta';
    else if (t.prioridade === 'baixa') prioBadgeClass = 'cyber-badge-baixa';

    return `
      <div class="smart-liger-parent card-item-tarefa ${t.feita ? 'tarefa-feita' : ''} prioridade-${t.prioridade}">
        <div class="smart-liger-card">
          <div class="smart-liger-glass">
            <div class="smart-liger-content">
              <div class="d-flex justify-content-between align-items-start gap-3">
                <!-- Toggle Checkbox Futurista (Shammy2002/evil-shrimp-6) -->
                <div class="d-flex align-items-center gap-3 flex-grow-1">
                  <label class="cyber-toggle" title="${t.feita ? 'Concluída (Clique para reabrir)' : 'Pendente (Clique para concluir)'}">
                    <input type="checkbox" class="check-feita" data-id="${t.id}" ${t.feita ? 'checked' : ''}>
                    <span class="cyber-slider">
                      <span class="cyber-knob"></span>
                    </span>
                  </label>

                  <div class="flex-grow-1">
                    <div class="d-flex align-items-center gap-2 flex-wrap">
                      <h5 class="card-title titulo-txt mb-0 fw-bold">${t.titulo}</h5>
                      ${t.feita ? '<span class="badge bg-success-subtle text-success small py-0 px-2 rounded-pill"><i class="bi bi-check2"></i> FEITA</span>' : ''}
                    </div>
                    ${t.descricao ? `<p class="text-secondary small mb-1 mt-1">${t.descricao}</p>` : ''}
                    <div class="d-flex align-items-center gap-3 mt-2 flex-wrap">
                      <span class="cyber-badge cyber-badge-category">
                        <i class="bi bi-folder2-open me-1"></i>${nomeCat}
                      </span>
                      <span class="cyber-badge ${prioBadgeClass}">
                        <i class="bi bi-speedometer2 me-1"></i>${t.prioridade}
                      </span>
                      ${prazoFmt ? `<span class="small text-secondary"><i class="bi bi-clock-history me-1 text-cyan"></i>Prazo: ${prazoFmt}</span>` : ''}
                    </div>
                  </div>
                </div>

                <!-- Botoes de Acao Sleek (Kabak/unlucky-treefrog-77) -->
                <div class="d-flex align-items-center gap-1 flex-shrink-0">
                  <button class="btn-cyber-action btn-editar" data-id="${t.id}" title="Editar Tarefa">
                    <i class="bi bi-pencil-fill"></i>
                  </button>
                  <button class="btn-cyber-action btn-cyber-delete btn-apagar" data-id="${t.id}" title="Excluir Tarefa">
                    <i class="bi bi-trash3-fill"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  inicializarModuloTarefas();
  inicializarAtalhosTeclado();
  renderizarLista();

  // Inicializa IA no canto e Audio Cibernetico
  CYBER_AUDIO.init();
  if (typeof NEXUS_AI !== 'undefined') {
    NEXUS_AI.inicializar();
  }

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
    CYBER_AUDIO.tocar('sucesso');
    emitirToastAviso('Tarefa cadastrada com sucesso!', 'success');
  });

  // Delegacao de cliques na lista
  document.getElementById('listaTarefasCards').addEventListener('change', (e) => {
    const check = e.target.closest('.check-feita');
    if (check) {
      const tarefa = alternarConclusao(check.dataset.id);
      if (tarefa) {
        registrarAcaoHistorico(tarefa.feita ? 'CONCLUIU' : 'REABRIU', tarefa.titulo);
        CYBER_AUDIO.tocar(tarefa.feita ? 'concluir' : 'click');
      }
      renderizarLista();
      emitirToastAviso(tarefa && tarefa.feita ? 'Tarefa concluída!' : 'Tarefa reaberta!', 'info');
      return;
    }
  });

  document.getElementById('listaTarefasCards').addEventListener('click', (e) => {
    const btnEditar = e.target.closest('.btn-editar');
    if (btnEditar) {
      CYBER_AUDIO.tocar('click');
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
      CYBER_AUDIO.tocar('click');
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
    CYBER_AUDIO.tocar('sucesso');
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
      CYBER_AUDIO.tocar('excluir');
      emitirToastAviso('Tarefa excluída!', 'danger');
    }
  });

  // Limpar concluidas
  document.getElementById('btnLimparFeitas')?.addEventListener('click', () => {
    CYBER_AUDIO.tocar('click');
    if (confirm('Deseja excluir todas as tarefas já marcadas como concluídas?')) {
      removerTodasConcluidas();
      renderizarLista();
      CYBER_AUDIO.tocar('excluir');
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
      CYBER_AUDIO.tocar('click');
      document.querySelectorAll('.btn-status').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      definirFiltroStatus(btn.dataset.status);
      renderizarLista();
    });
  });

  // Botoes de prioridade
  document.querySelectorAll('.btn-prio').forEach(btn => {
    btn.addEventListener('click', () => {
      CYBER_AUDIO.tocar('click');
      document.querySelectorAll('.btn-prio').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      definirFiltroPrioridade(btn.dataset.prio);
      renderizarLista();
    });
  });

  // Alternador de tema cibernetico
  document.getElementById('btnAlternarTema')?.addEventListener('click', () => {
    CYBER_AUDIO.tocar('click');
    const atual = document.body.getAttribute('data-bs-theme');
    const novo = atual === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-bs-theme', novo);
    localStorage.setItem('tema_aluno', novo);
  });

  // Carregar tema salvo
  const temaSalvo = localStorage.getItem('tema_aluno') || 'dark';
  document.body.setAttribute('data-bs-theme', temaSalvo);
});
