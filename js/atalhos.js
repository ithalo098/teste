// Gerenciador de atalhos de teclado do aplicativo
function inicializarAtalhosTeclado() {
  window.addEventListener('keydown', (e) => {
    // Escape fecha modais
    if (e.key === 'Escape') {
      const modalAtivo = document.querySelector('.modal.show');
      if (modalAtivo) {
        const inst = bootstrap.Modal.getInstance(modalAtivo);
        if (inst) inst.hide();
      }
    }
  });
}
