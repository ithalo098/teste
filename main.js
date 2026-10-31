// Processo principal do Electron (main.js)
// Responsavel por criar a janela nativa do sistema operacional
const { app, BrowserWindow, Menu, dialog } = require('electron');
const path = require('path');

let janelaPrincipal = null;

function criarJanela() {
  janelaPrincipal = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 850,
    minHeight: 600,
    title: 'NEXUS TAREFAS AI - Grau Técnico Desktop',
    backgroundColor: '#07070a',
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  janelaPrincipal.loadFile(path.join(__dirname, 'index.html'));

  janelaPrincipal.on('closed', () => {
    janelaPrincipal = null;
  });

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
        {
          label: 'Ferramentas de Desenvolvedor (F12)',
          accelerator: 'F12',
          click: () => {
            if (janelaPrincipal) janelaPrincipal.webContents.toggleDevTools();
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
              title: 'Sobre o Nexus Tarefas AI',
              message: 'NEXUS TAREFAS AI - Edição Desktop',
              detail: 'Desenvolvido para Grau Técnico por ithalo098.\nInterface Futurista 100% Offline e Portátil.'
            });
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(templateMenu);
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(() => {
  criarJanela();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      criarJanela();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
