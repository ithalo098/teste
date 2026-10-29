// Processo principal do Electron (main.js)
// Responsavel por criar a janela nativa do sistema operacional
const { app, BrowserWindow, Menu, ipcMain, dialog } = require('electron');
const path = require('path');

let janelaPrincipal = null;

// Funcao que cria a janela do app
function criarJanela() {
  janelaPrincipal = new BrowserWindow({
    width: 1100,
    height: 750,
    minWidth: 850,
    minHeight: 600,
    title: 'Minhas Tarefas Desktop',
    backgroundColor: '#f8f9fa',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // Carrega o arquivo HTML principal
  janelaPrincipal.loadFile('index.html');

  // Trata o evento de quando a janela e fechada
  janelaPrincipal.on('closed', () => {
    janelaPrincipal = null;
  });

  // Menu customizado para o aplicativo
  const templateMenu = [
    {
      label: 'Arquivo',
      submenu: [
        {
          label: 'Recarregar',
          accelerator: 'CmdOrCtrl+R',
          click: () => {
            if (janelaPrincipal) janelaPrincipal.reload();
          }
        },
        { type: 'separator' },
        {
          label: 'Sair',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'Visualizar',
      submenu: [
        { role: 'resetZoom', label: 'Tamanho Padrao' },
        { role: 'zoomIn', label: 'Aumentar Zoom' },
        { role: 'zoomOut', label: 'Diminuir Zoom' },
        { type: 'separator' },
        { role: 'togglefullscreen', label: 'Tela Cheia' }
      ]
    },
    {
      label: 'Ajuda',
      submenu: [
        {
          label: 'Sobre o Projeto',
          click: () => {
            dialog.showMessageBox(janelaPrincipal, {
              type: 'info',
              title: 'Sobre o TaskMaster',
              message: 'Minhas Tarefas Desktop',
              detail: 'Trabalho pratico desenvolvido por ithalo098 e trio na disciplina de Desenvolvimento Desktop.'
            });
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(templateMenu);
  Menu.setApplicationMenu(menu);
}

// Inicializacao quando o Electron estiver pronto
app.whenReady().then(() => {
  criarJanela();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      criarJanela();
    }
  });
});

// Encerra quando todas as janelas forem fechadas no Windows
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
