// Testes de integridade do storage
function executarTestesStorage() {
  console.log('Executando teste de storage...');
  const teste = [{ id: 1, nome: 'teste' }];
  STORAGE_ENGINE.salvar('teste_key', teste);
  const lido = STORAGE_ENGINE.recuperar('teste_key');
  console.assert(lido && lido.length === 1, 'Teste de storage passou!');
  STORAGE_ENGINE.remover('teste_key');
}
