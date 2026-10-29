// Modulo de calculo de estatisticas e indicadores
function calcularEstatisticasTarefas(lista) {
  const total = lista.length;
  const concluidas = lista.filter(t => t.feita).length;
  const pendentes = total - concluidas;
  const porcentagem = total > 0 ? Math.round((concluidas / total) * 100) : 0;

  const porPrioridade = {
    alta: lista.filter(t => t.prioridade === 'alta').length,
    media: lista.filter(t => t.prioridade === 'media').length,
    baixa: lista.filter(t => t.prioridade === 'baixa').length
  };

  return { total, concluidas, pendentes, porcentagem, porPrioridade };
}
