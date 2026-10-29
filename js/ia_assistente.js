// Modulo de Inteligencia Artificial Cibernetica (NEXUS AI 2.0)
// Assistente inteligente no canto para gestao autonoma de tarefas e suporte tecnico

const NEXUS_AI = {
  aberto: false,
  historicoMensagens: [],

  inicializar() {
    this.injetarInterface();
    this.vincularEventos();
    this.adicionarMensagemSistema(
      "⚡ **NEXUS AI 2.0 ONLINE**\nOlá! Sou seu copiloto cibernético de produtividade. Posso criar tarefas automaticamente para você (ex: *'Criar tarefa: Estudar Redes amanhã com prioridade alta'*), otimizar seus horários ou sugerir metas de estudo técnicas. Como posso acelerar seu fluxo hoje?"
    );
  },

  injetarInterface() {
    if (document.getElementById('nexus-ai-container')) return;

    const container = document.createElement('div');
    container.id = 'nexus-ai-container';
    container.className = 'nexus-ai-wrapper';
    container.innerHTML = `
      <!-- Janela do Chat da IA -->
      <div id="nexusAiWindow" class="nexus-ai-window d-none">
        <div class="nexus-ai-header">
          <div class="d-flex align-items-center gap-2">
            <div class="nexus-core-mini">
              <span class="nexus-pulse-ring"></span>
              <i class="bi bi-cpu-fill text-cyan"></i>
            </div>
            <div>
              <div class="fw-bold nexus-ai-title">NEXUS AI <span class="badge-quantum">v2.0</span></div>
              <div class="nexus-ai-status"><span class="nexus-status-dot"></span> NEURAL LINK ATIVO</div>
            </div>
          </div>
          <div class="d-flex align-items-center gap-1">
            <button id="btnAiSom" class="btn-ai-icon" title="Alternar Efeitos Sonoros">
              <i class="bi bi-volume-up-fill" id="iconeSomAi"></i>
            </button>
            <button id="btnFecharAi" class="btn-ai-icon" title="Minimizar IA">
              <i class="bi bi-dash-lg"></i>
            </button>
          </div>
        </div>

        <!-- Sugestoes Rapidas (Chips) -->
        <div class="nexus-ai-chips">
          <button class="ai-chip" data-cmd="otimizar">⚡ Otimizar Rotina</button>
          <button class="ai-chip" data-cmd="sugerir">🎯 Tarefas de Estudo</button>
          <button class="ai-chip" data-cmd="status">📊 Diagnóstico</button>
          <button class="ai-chip" data-cmd="limpar">🧹 Limpar Feitas</button>
        </div>

        <!-- Area de Mensagens -->
        <div id="nexusAiMessages" class="nexus-ai-messages">
          <!-- Mensagens geradas dinamicamente -->
        </div>

        <!-- Indicador de Digitacao -->
        <div id="nexusAiTyping" class="nexus-ai-typing d-none">
          <span class="typing-dot"></span>
          <span class="typing-dot"></span>
          <span class="typing-dot"></span>
          <span class="small ms-1 text-cyan opacity-75">Processando rede neural...</span>
        </div>

        <!-- Formulario de Entrada do Chat -->
        <form id="nexusAiForm" class="nexus-ai-input-area">
          <input type="text" id="nexusAiInput" class="nexus-ai-input" placeholder="Comando ou pergunte algo... (ex: criar tarefa: Estudar SQL)" autocomplete="off">
          <button type="submit" class="btn-ai-send" title="Enviar Mensagem">
            <i class="bi bi-send-fill"></i>
          </button>
        </form>
      </div>

      <!-- Botao Flutuante da IA no Canto Futurista -->
      <button id="nexusAiTrigger" class="btn-nexus-ai-float" title="Abrir Assistente NEXUS AI">
        <span class="nexus-ai-icon-pulse">
          <i class="bi bi-cpu-fill"></i>
        </span>
        <span class="nexus-ai-label">NEXUS AI</span>
        <span class="nexus-ai-live-badge">2.0</span>
      </button>
    `;

    document.body.appendChild(container);
  },

  vincularEventos() {
    const trigger = document.getElementById('nexusAiTrigger');
    const janela = document.getElementById('nexusAiWindow');
    const fechar = document.getElementById('btnFecharAi');
    const form = document.getElementById('nexusAiForm');
    const input = document.getElementById('nexusAiInput');
    const btnSom = document.getElementById('btnAiSom');

    trigger.addEventListener('click', () => {
      this.aberto = !this.aberto;
      if (this.aberto) {
        janela.classList.remove('d-none');
        trigger.classList.add('active');
        input.focus();
        CYBER_AUDIO.tocar('ai_ativar');
      } else {
        janela.classList.add('d-none');
        trigger.classList.remove('active');
        CYBER_AUDIO.tocar('click');
      }
    });

    fechar.addEventListener('click', () => {
      this.aberto = false;
      janela.classList.add('d-none');
      trigger.classList.remove('active');
      CYBER_AUDIO.tocar('click');
    });

    btnSom.addEventListener('click', () => {
      const ativo = CYBER_AUDIO.alternarSom();
      const icone = document.getElementById('iconeSomAi');
      if (ativo) {
        icone.className = 'bi bi-volume-up-fill';
        CYBER_AUDIO.tocar('click');
      } else {
        icone.className = 'bi bi-volume-mute-fill';
      }
    });

    // Chips de comando rapido
    document.querySelectorAll('.ai-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        const cmd = e.target.dataset.cmd;
        CYBER_AUDIO.tocar('click');
        this.executarComandoRapido(cmd);
      });
    });

    // Envio de mensagem
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const texto = input.value.trim();
      if (!texto) return;

      this.adicionarMensagemUsuario(texto);
      input.value = '';
      CYBER_AUDIO.tocar('ai_beep');

      this.processarMensagem(texto);
    });
  },

  adicionarMensagemUsuario(texto) {
    const container = document.getElementById('nexusAiMessages');
    const div = document.createElement('div');
    div.className = 'nexus-msg user-msg';
    div.innerHTML = `
      <div class="msg-bubble">${this.formatarTexto(texto)}</div>
      <div class="msg-avatar user-avatar"><i class="bi bi-person-fill"></i></div>
    `;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
  },

  adicionarMensagemSistema(texto) {
    const container = document.getElementById('nexusAiMessages');
    const div = document.createElement('div');
    div.className = 'nexus-msg ai-msg';
    div.innerHTML = `
      <div class="msg-avatar ai-avatar"><i class="bi bi-cpu-fill"></i></div>
      <div class="msg-bubble">${this.formatarTexto(texto)}</div>
    `;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
  },

  mostrarDigitando(visivel) {
    const el = document.getElementById('nexusAiTyping');
    if (el) {
      if (visivel) el.classList.remove('d-none');
      else el.classList.add('d-none');
    }
  },

  formatarTexto(txt) {
    let fmt = txt
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code class="cyber-code">$1</code>')
      .replace(/\n/g, '<br>');
    return fmt;
  },

  processarMensagem(texto) {
    this.mostrarDigitando(true);
    const txtLower = texto.toLowerCase();

    setTimeout(() => {
      this.mostrarDigitando(false);
      CYBER_AUDIO.tocar('ai_beep');

      // 1. Comando de Criar Tarefa
      if (txtLower.includes('criar tarefa') || txtLower.includes('adicionar tarefa') || txtLower.includes('nova tarefa') || txtLower.startsWith('criar') || txtLower.startsWith('add')) {
        this.tratarCriacaoTarefaIA(texto);
        return;
      }

      // 2. Otimizar / Organizar
      if (txtLower.includes('otimizar') || txtLower.includes('organizar') || txtLower.includes('rotina') || txtLower.includes('prioridade')) {
        this.executarOtimizacaoRotina();
        return;
      }

      // 3. Sugestoes de Estudo
      if (txtLower.includes('sugerir') || txtLower.includes('estudo') || txtLower.includes('estudar') || txtLower.includes('ideia')) {
        this.executarSugestaoEstudos();
        return;
      }

      // 4. Status / Diagnostico
      if (txtLower.includes('status') || txtLower.includes('diagnostico') || txtLower.includes('quantas') || txtLower.includes('relatorio')) {
        this.executarDiagnostico();
        return;
      }

      // 5. Limpeza de concluidas
      if (txtLower.includes('limpar') || txtLower.includes('apagar concluidas') || txtLower.includes('remover concluidas')) {
        this.executarLimpezaConcluidas();
        return;
      }

      // 6. Duvidas Tecnicas / Perguntas
      if (txtLower.includes('redes') || txtLower.includes('ip') || txtLower.includes('cisco') || txtLower.includes('switch') || txtLower.includes('roteador')) {
        this.adicionarMensagemSistema(
          "🌐 **Módulo Redes de Computadores:**\nPara tópicos de Redes no Grau Técnico, recomendo praticar cálculo de máscara de sub-rede (/24 a /30) e topologia no Cisco Packet Tracer. Deseja que eu crie uma tarefa para *'Configurar roteamento estático no Packet Tracer'*?"
        );
        return;
      }

      if (txtLower.includes('banco') || txtLower.includes('sql') || txtLower.includes('mysql') || txtLower.includes('database')) {
        this.adicionarMensagemSistema(
          "💾 **Módulo Banco de Dados:**\nFoque em normalização (1FN, 2FN, 3FN) e queries com `INNER JOIN` e agregações (`GROUP BY`). Deseja que eu gere uma tarefa de estudo para *'Praticar consultas SQL com JOIN'*?"
        );
        return;
      }

      if (txtLower.includes('programacao') || txtLower.includes('javascript') || txtLower.includes('python') || txtLower.includes('codigo') || txtLower.includes('electron')) {
        this.adicionarMensagemSistema(
          "💻 **Módulo Programação & Desktop:**\nEste projeto utiliza Electron, Vanilla JS e Bootstrap 5 com arquitetura modular. Pratique manipular o DOM com segurança e usar o preload script com `contextBridge` para isolamento de processo!"
        );
        return;
      }

      // 7. Resposta padrao inteligente
      this.adicionarMensagemSistema(
        `🤖 Compreendi seu input: *"${texto}"*.\n\nVocê pode me pedir diretamente para criar tarefas, por exemplo:\n• *"Criar tarefa: Revisar cabeamento estruturado prioridade alta"*\n• *"Criar tarefa: Estudo para prova de Hardware data amanhã"*\n\nOu use os botões rápidos no topo do painel!`
      );
    }, 600);
  },

  tratarCriacaoTarefaIA(texto) {
    // Extrai o titulo da tarefa
    let limpo = texto
      .replace(/criar tarefa\s*:?/i, '')
      .replace(/adicionar tarefa\s*:?/i, '')
      .replace(/nova tarefa\s*:?/i, '')
      .replace(/^criar\s*:?/i, '')
      .replace(/^add\s*:?/i, '')
      .trim();

    if (!limpo) {
      this.adicionarMensagemSistema("⚠️ Por favor informe o título da tarefa. Exemplo: *'Criar tarefa: Estudar comandos Linux'*");
      return;
    }

    // Deteccao automatica de Prioridade
    let prioridade = 'media';
    if (/alta|urgente|critica|importante/i.test(texto)) prioridade = 'alta';
    else if (/baixa|leve|tranquila/i.test(texto)) prioridade = 'baixa';

    // Deteccao automatica de Categoria
    let categoria = 'geral';
    if (/rede|cisco|switch|ip|roteador|packet/i.test(texto)) categoria = 'redes';
    else if (/hardware|placa|memoria|cooler|processador|fonte/i.test(texto)) categoria = 'hardware';
    else if (/programa|codigo|js|javascript|html|css|python|logica/i.test(texto)) categoria = 'programacao';
    else if (/banco|dados|sql|mysql|tabela|query/i.test(texto)) categoria = 'banco_dados';
    else if (/sistema|linux|windows|so|cmd|terminal/i.test(texto)) categoria = 'sistemas';

    // Remove palavras de controle do titulo final
    let tituloFinal = limpo
      .replace(/prioridade\s+(alta|media|baixa|urgente)/gi, '')
      .replace(/categoria\s+\w+/gi, '')
      .replace(/com urgencia/gi, '')
      .trim();

    if (!tituloFinal) tituloFinal = limpo;

    // Calcula prazo para amanha se mencionado
    let dataLimite = '';
    if (/amanh[aã]/i.test(texto)) {
      const d = new Date();
      d.setDate(d.getDate() + 1);
      dataLimite = d.toISOString().split('T')[0];
    } else if (/hoje/i.test(texto)) {
      dataLimite = new Date().toISOString().split('T')[0];
    }

    // Chama a funcao nativa do projeto
    const nova = adicionarTarefa(tituloFinal, "Criada automaticamente via NEXUS AI 2.0", categoria, prioridade, dataLimite);
    registrarAcaoHistorico('CRIOU_VIA_IA', tituloFinal);
    renderizarLista();
    CYBER_AUDIO.tocar('sucesso');

    const catNome = CATEGORIAS_ENGINE.obterNomeCategoria(categoria);
    this.adicionarMensagemSistema(
      `✅ **Tarefa Criada com Sucesso pela IA!**\n\n📌 **Título:** ${tituloFinal}\n📂 **Categoria:** ${catNome}\n⚡ **Prioridade:** ${prioridade.toUpperCase()}${dataLimite ? `\n📅 **Prazo:** ${dataLimite.split('-').reverse().join('/')}` : ''}\n\nA lista foi atualizada em tempo real na tela!`
    );
    emitirToastAviso('NEXUS AI adicionou uma nova tarefa!', 'success');
  },

  executarComandoRapido(cmd) {
    if (cmd === 'otimizar') this.executarOtimizacaoRotina();
    else if (cmd === 'sugerir') this.executarSugestaoEstudos();
    else if (cmd === 'status') this.executarDiagnostico();
    else if (cmd === 'limpar') this.executarLimpezaConcluidas();
  },

  executarOtimizacaoRotina() {
    this.mostrarDigitando(true);
    setTimeout(() => {
      this.mostrarDigitando(false);
      const tarefas = listarTodasTarefas();
      const pendentes = tarefas.filter(t => !t.feita);
      const altas = pendentes.filter(t => t.prioridade === 'alta');

      if (pendentes.length === 0) {
        this.adicionarMensagemSistema("🎉 **Parabéns!** Você não possui nenhuma tarefa pendente no momento. Sua matriz de produtividade está 100% livre!");
        return;
      }

      let recomendacao = `⚡ **Plano de Ataque Otimizado pela IA:**\n\n`;
      recomendacao += `Total pendente: **${pendentes.length}** tarefas.\n\n`;

      if (altas.length > 0) {
        recomendacao += `🔴 **Atenção Imediata (Prioridade Alta):**\n`;
        altas.forEach((t, i) => {
          recomendacao += `${i + 1}. **${t.titulo}** (${CATEGORIAS_ENGINE.obterNomeCategoria(t.categoria)})\n`;
        });
        recomendacao += `\n*Dica de IA:* Dedique blocos Pomodoro de 25 minutos sem distrações para liquidar estes itens primeiro!`;
      } else {
        recomendacao += `🟢 Suas pendências estão em nível médio e baixo. Recomendo começar por: **${pendentes[0].titulo}** para criar tração cognitiva!`;
      }

      this.adicionarMensagemSistema(recomendacao);
    }, 500);
  },

  executarSugestaoEstudos() {
    this.mostrarDigitando(true);
    setTimeout(() => {
      this.mostrarDigitando(false);
      const sugestoes = [
        { tit: "Simulação de Sub-redes IPv4 no Packet Tracer", cat: "redes", prio: "alta" },
        { tit: "Revisar Comandos DDL e DML em SQL", cat: "banco_dados", prio: "media" },
        { tit: "Prática de Manutenção Preventiva e Montagem", cat: "hardware", prio: "media" }
      ];

      sugestoes.forEach(s => {
        adicionarTarefa(s.tit, "Sugestão técnica gerada automaticamente pelo NEXUS AI", s.cat, s.prio, '');
      });

      renderizarLista();
      CYBER_AUDIO.tocar('sucesso');

      this.adicionarMensagemSistema(
        "🎯 **3 Tarefas Técnicas Injetadas na sua Lista!**\n\n1. *Simulação de Sub-redes IPv4*\n2. *Revisar Comandos DDL e DML*\n3. *Prática de Manutenção Preventiva*\n\nTodas já estão prontas no seu painel para você executar!"
      );
      emitirToastAviso('3 tarefas geradas pela IA!', 'info');
    }, 500);
  },

  executarDiagnostico() {
    this.mostrarDigitando(true);
    setTimeout(() => {
      this.mostrarDigitando(false);
      const lista = listarTodasTarefas();
      const stats = calcularEstatisticasTarefas(lista);
      const pct = stats.total > 0 ? Math.round((stats.concluidas / stats.total) * 100) : 0;

      let msg = `📊 **Diagnóstico do Sistema & Eficiência:**\n\n`;
      msg += `• Total de Atividades: **${stats.total}**\n`;
      msg += `• Concluídas: **${stats.concluidas}**\n`;
      msg += `• Pendentes: **${stats.pendentes}**\n`;
      msg += `• Taxa de Eficiência: **${pct}%**\n\n`;

      if (pct >= 80) msg += `🔥 **Status:** Produtividade Cibernética de Elite! Excelente ritmo.`;
      else if (pct >= 50) msg += `⚡ **Status:** Bom progresso. Mantenha o foco para liquidar as pendências.`;
      else msg += `⚠️ **Status:** Carga de tarefas pendentes elevada. Sugiro usar a ferramenta Otimizar Rotina.`;

      this.adicionarMensagemSistema(msg);
    }, 400);
  },

  executarLimpezaConcluidas() {
    this.mostrarDigitando(true);
    setTimeout(() => {
      this.mostrarDigitando(false);
      const totalAntes = listarTodasTarefas().length;
      removerTodasConcluidas();
      const totalDepois = listarTodasTarefas().length;
      const removidas = totalAntes - totalDepois;

      renderizarLista();
      CYBER_AUDIO.tocar('excluir');

      if (removidas > 0) {
        this.adicionarMensagemSistema(`🧹 **Limpeza Concluída:** Removi **${removidas}** tarefa(s) concluída(s) do seu banco de dados local.`);
        emitirToastAviso(`${removidas} tarefas limpas pela IA!`, 'warning');
      } else {
        this.adicionarMensagemSistema(`ℹ️ Não havia nenhuma tarefa concluída para limpar.`);
      }
    }, 400);
  }
};
