// Configuracoes gerais do aplicativo de tarefas
// Trabalho pratico em trio - Grau Tecnico
// Autor: ithalo098 e trio

const CONFIG_APP = {
  nome: 'Minhas Tarefas Desktop',
  versao: '1.0.0',
  ambiente: 'desenvolvimento',
  chaveStorage: 'tarefas_desktop_aluno',
  chaveTema: 'tema_preferido_aluno',
  limiteTitulo: 80,
  limiteDescricao: 300,
  
  // Categorias principais
  categorias: [
    { id: 'redes', nome: 'Redes de Computadores', cor: '#0d6efd', icone: 'bi-hdd-network' },
    { id: 'hardware', nome: 'Manutencao de Hardware', cor: '#dc3545', icone: 'bi-cpu' },
    { id: 'programacao', nome: 'Desenvolvimento e Logica', cor: '#198754', icone: 'bi-code-slash' },
    { id: 'banco_dados', nome: 'Banco de Dados', cor: '#fd7e14', icone: 'bi-database' },
    { id: 'sistemas', nome: 'Sistemas Operacionais', cor: '#6f42c1', icone: 'bi-terminal' },
    { id: 'geral', nome: 'Atividades Gerais da Escola', cor: '#6c757d', icone: 'bi-journal-check' }
  ],

  // Prioridades permitidas
  prioridades: {
    baixa: { rotulo: 'Baixa', corBadge: 'success', peso: 1 },
    media: { rotulo: 'Media', corBadge: 'warning', peso: 2 },
    alta: { rotulo: 'Alta', corBadge: 'danger', peso: 3 }
  },

  // Mensagens padrao
  mensagens: {
    sucessoCriar: 'Tarefa cadastrada com sucesso!',
    sucessoEditar: 'Tarefa atualizada com sucesso!',
    sucessoExcluir: 'Tarefa removida com sucesso!',
    sucessoConcluir: 'Status da tarefa alterado!',
    erroTituloVazio: 'O titulo da tarefa nao pode estar vazio.',
    erroDescricaoGrande: 'A descricao ultrapassou o limite de caracteres.'
  }
};

// Funcoes auxiliares de configuracao
function pegarConfiguracao(chave) {
  return CONFIG_APP[chave] || null;
}

function listarCategoriasDisponiveis() {
  return CONFIG_APP.categorias;
}

function obterDadosPrioridade(chavePrioridade) {
  return CONFIG_APP.prioridades[chavePrioridade] || CONFIG_APP.prioridades.media;
}
