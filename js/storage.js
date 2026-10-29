// Modulo responsavel por toda a persistencia no LocalStorage
// Garante que nenhuma tarefa seja perdida ao fechar a aplicacao Electron

const STORAGE_ENGINE = {
  salvar(chave, valor) {
    try {
      const serializado = JSON.stringify(valor);
      localStorage.setItem(chave, serializado);
      return true;
    } catch (e) {
      console.error('Erro ao gravar no localStorage:', e);
      return false;
    }
  },

  recuperar(chave, padrao = null) {
    try {
      const dados = localStorage.getItem(chave);
      if (dados === null || dados === undefined) return padrao;
      return JSON.parse(dados);
    } catch (e) {
      console.error('Erro ao ler do localStorage:', e);
      return padrao;
    }
  },

  remover(chave) {
    try {
      localStorage.removeItem(chave);
      return true;
    } catch (e) {
      console.error('Erro ao remover chave:', e);
      return false;
    }
  },

  limparTudo() {
    try {
      localStorage.clear();
      return true;
    } catch (e) {
      console.error('Erro ao limpar storage:', e);
      return false;
    }
  }
};
