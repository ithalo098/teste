// Controlador da pagina de historico
function carregarTabelaHistorico() {
  const lista = obterHistoricoCompleto();
  const tbody = document.getElementById('corpoTabelaHistorico');
  if (!tbody) return;

  if (lista.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" class="text-center text-muted">Nenhum evento registrado ainda.</td></tr>';
    return;
  }

  tbody.innerHTML = lista.map(item => {
    return `
      <tr>
        <td>${item.data}</td>
        <td><span class="badge bg-primary">${item.acao}</span></td>
        <td>${item.tarefa}</td>
        <td>Operação registrada no sistema</td>
      </tr>
    `;
  }).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  carregarTabelaHistorico();
});
