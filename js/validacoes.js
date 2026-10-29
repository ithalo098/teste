// Modulo de validacoes de dados e regras de negocio
const VALIDADOR = {
  validarTitulo(titulo) {
    if (!titulo || typeof titulo !== 'string') return { valido: false, erro: 'Titulo invalido.' };
    const limpo = titulo.trim();
    if (limpo.length === 0) return { valido: false, erro: 'O titulo e obrigatorio.' };
    if (limpo.length > 80) return { valido: false, erro: 'Titulo muito longo (maximo 80 caracteres).' };
    return { valido: true, valor: limpo };
  },

  validarDescricao(desc) {
    if (!desc) return { valido: true, valor: '' };
    const limpo = desc.trim();
    if (limpo.length > 300) return { valido: false, erro: 'Descricao muito longa (maximo 300 caracteres).' };
    return { valido: true, valor: limpo };
  },

  validarPrioridade(p) {
    const permitidas = ['baixa', 'media', 'alta'];
    return permitidas.includes(p) ? p : 'media';
  }
};
