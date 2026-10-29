// Controlador da tela de configuracoes
function inicializarTelaConfiguracoes() {
  const btn = document.getElementById('btnSalvarConfig');
  if (btn) {
    btn.addEventListener('click', () => {
      alert('Preferências salvas com sucesso!');
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  inicializarTelaConfiguracoes();
});
