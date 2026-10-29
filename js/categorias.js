// Modulo de gerenciamento de categorias de estudo
const CATEGORIAS_ENGINE = {
  obterNomeCategoria(id) {
    const encontrada = CONFIG_APP.categorias.find(c => c.id === id);
    return encontrada ? encontrada.nome : 'Geral';
  },

  obterCorCategoria(id) {
    const encontrada = CONFIG_APP.categorias.find(c => c.id === id);
    return encontrada ? encontrada.cor : '#6c757d';
  },

  obterIconeCategoria(id) {
    const encontrada = CONFIG_APP.categorias.find(c => c.id === id);
    return encontrada ? encontrada.icone : 'bi-tag';
  }
};
