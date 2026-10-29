# Arquitetura do Projeto

## 1. Padrão de Arquitetura do Electron
A aplicação adota a divisão entre processos exigida pela arquitetura do Electron:

```
[Processo Principal: main.js] 
            │
            ├─► Gerencia janelas nativas (BrowserWindow)
            ├─► Menus de aplicativo do sistema
            └─► Preload seguro (contextIsolation: true)
            │
            ▼
[Processo de Renderização: index.html]
            │
            ├─► Bootstrap 5.3 (CSS e JS)
            ├─► Módulos JS da aplicação (tarefas, storage, filtros)
            └─► Persistência local (LocalStorage)
```

## 2. Divisão de Responsabilidades
- `config/config.js`: Centraliza constantes e categorias do sistema.
- `js/storage.js`: Isola a camada de persistência para facilitar testes.
- `js/tarefas.js`: Contém as regras de negócio do CRUD.
- `js/filtros.js`: Implementa o algoritmo de busca e filtros combinados.
- `js/app.js`: Conecta os eventos do DOM com os módulos de negócio.
