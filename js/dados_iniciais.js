// Base de dados inicial mockada com tarefas realistas de cursos tecnicos
// Serve para alimentar o sistema no primeiro acesso do aluno

const TAREFAS_MOCKADAS = [
  {
    id: 'tarefa_101',
    titulo: 'Montagem e teste de bancada no Lab 04',
    descricao: 'Testar fonte ATX com multimetro digital e conferir as tensoes de 12V, 5V e 3.3V.',
    categoria: 'hardware',
    prioridade: 'alta',
    dataLimite: '2026-10-28',
    feita: false,
    criadaEm: '2026-10-20'
  },
  {
    id: 'tarefa_102',
    titulo: 'Configurar roteador e switch no Cisco Packet Tracer',
    descricao: 'Criar topologia com 3 sub-redes e configurar rotas estaticas com mascara /24.',
    categoria: 'redes',
    prioridade: 'alta',
    dataLimite: '2026-10-26',
    feita: true,
    criadaEm: '2026-10-19'
  },
  {
    id: 'tarefa_103',
    titulo: 'Modelar diagrama ER do banco de dados da biblioteca',
    descricao: 'Identificar entidades Livro, Aluno e Emprestimo no brModelo com cardinalidade.',
    categoria: 'banco_dados',
    prioridade: 'media',
    dataLimite: '2026-10-30',
    feita: false,
    criadaEm: '2026-10-21'
  },
  {
    id: 'tarefa_104',
    titulo: 'Instalar maquina virtual Linux Ubuntu no VirtualBox',
    descricao: 'Alocar 20GB de disco e configurar adaptador de rede em modo Bridge.',
    categoria: 'sistemas',
    prioridade: 'baixa',
    dataLimite: '2026-11-04',
    feita: false,
    criadaEm: '2026-10-22'
  },
  {
    id: 'tarefa_105',
    titulo: 'Praticar comandos SQL de consulta e juncao (INNER JOIN)',
    descricao: 'Resolver lista de exercicios relacionando tabela de alunos e notas.',
    categoria: 'banco_dados',
    prioridade: 'media',
    dataLimite: '2026-10-29',
    feita: false,
    criadaEm: '2026-10-23'
  },
  {
    id: 'tarefa_106',
    titulo: 'Crimpar cabo de rede par trancado padrao T568A',
    descricao: 'Montar cabo de rede direto com conectores RJ45 e testar com testador de cabos.',
    categoria: 'redes',
    prioridade: 'media',
    dataLimite: '2026-10-25',
    feita: true,
    criadaEm: '2026-10-18'
  }
];

function obterTarefasPadraoIniciais() {
  return JSON.parse(JSON.stringify(TAREFAS_MOCKADAS));
}
