// Testes unitarios do modulo de filtros
function executarTestesFiltros() {
  console.log('Executando teste de filtros...');
  definirFiltroTexto('Redes');
  const lista = [{ titulo: 'Estudar Redes', feita: false, prioridade: 'alta' }];
  const filtradas = filtrarTarefasColecao(lista);
  console.assert(filtradas.length === 1, 'Filtro textual funcionou!');
  definirFiltroTexto('');
}
