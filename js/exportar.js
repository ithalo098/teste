// Modulo de exportacao de dados em CSV e JSON
const EXPORTADOR = {
  paraCSV(tarefas) {
    const cabecalho = 'ID;Titulo;Descricao;Categoria;Prioridade;Concluida;DataEntrega
';
    const linhas = tarefas.map(t => {
      return `"${t.id}";"${t.titulo}";"${t.descricao || ''}";"${t.categoria}";"${t.prioridade}";"${t.feita ? 'Sim' : 'Nao'}";"${t.dataLimite || ''}"`;
    }).join('
');

    const conteudo = '﻿' + cabecalho + linhas;
    const blob = new Blob([conteudo], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'tarefas_aluno_' + new Date().toISOString().split('T')[0] + '.csv';
    link.click();
  }
};
