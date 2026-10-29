// Modulo de controle das configuracoes da aplicacao
const CONFIG_CONTROLLER = {
  obterTemaSalvo() {
    return localStorage.getItem('tema_aluno') || 'light';
  },

  salvarTema(novoTema) {
    localStorage.setItem('tema_aluno', novoTema);
    document.body.setAttribute('data-bs-theme', novoTema);
  }
};
