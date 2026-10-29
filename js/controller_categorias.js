// Controlador da pagina de gerenciamento de categorias
function carregarGradeCategorias() {
  const container = document.getElementById('listaCategoriasContainer');
  if (!container) return;

  const categorias = listarCategoriasDisponiveis();
  container.innerHTML = `
    <div class="row g-3">
      ${categorias.map(cat => {
        return `
          <div class="col-md-6">
            <div class="card p-3 border" style="border-left: 5px solid ${cat.cor} !important;">
              <h6 class="fw-bold mb-1"><i class="bi ${cat.icone} me-1"></i>${cat.nome}</h6>
              <small class="text-muted">ID: ${cat.id}</small>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  carregarGradeCategorias();
});
