// Controlador da pagina de relatorios e estatisticas
function renderizarTelaEstatisticas() {
  const todas = listarTodasTarefas();
  const container = document.getElementById('graficoStatusContainer');
  if (!container) return;

  const stats = calcularEstatisticasTarefas(todas);
  container.innerHTML = `
    <div class="p-3 bg-light rounded">
      <h6>Taxa de Conclusão: ${stats.porcentagem}%</h6>
      ${GRAFICOS_ENGINE.desenharBarraProgresso(stats.porcentagem, 300, 24)}
      <ul class="list-group list-group-flush mt-3">
        <li class="list-group-item d-flex justify-content-between">Total de Tarefas <span>${stats.total}</span></li>
        <li class="list-group-item d-flex justify-content-between">Concluídas <span>${stats.concluidas}</span></li>
        <li class="list-group-item d-flex justify-content-between">Pendentes <span>${stats.pendentes}</span></li>
      </ul>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  renderizarTelaEstatisticas();
});
