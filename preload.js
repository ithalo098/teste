// Script de preload do Electron para seguranca (preload.js)
// Cria uma ponte segura entre o processo principal e o renderer
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  versaoApp: '1.0.0',
  plataforma: process.platform,
  
  // Funcao para emitir alerta nativo
  exibirAlertaNativo: (titulo, mensagem) => {
    console.log('[Electron Native Alert]', titulo, mensagem);
  },

  // Informacoes do sistema
  obterInfoSistema: () => {
    return {
      sistema: process.platform,
      arquitetura: process.arch,
      versaoNode: process.versions.node,
      versaoElectron: process.versions.electron
    };
  }
});

console.log('Preload do Electron inicializado com sucesso.');
