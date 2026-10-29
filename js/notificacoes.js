// Modulo de notificacoes estilo toast do Bootstrap
function emitirToastAviso(mensagem, tipo = 'success') {
  const toastEl = document.getElementById('toastAviso');
  const msgEl = document.getElementById('toastTexto');
  if (toastEl && msgEl) {
    msgEl.innerText = mensagem;
    toastEl.className = `toast align-items-center text-bg-${tipo} border-0`;
    const inst = bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 2800 });
    inst.show();
  }
}
