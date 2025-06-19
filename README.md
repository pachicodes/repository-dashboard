# Repository Dashboard

Este projeto é um dashboard que exibe o status de repositórios do GitHub. Ele permite que os usuários visualizem informações detalhadas sobre cada repositório, incluindo seu status atual.

## Estrutura do Projeto

- **src/**: Contém o código-fonte da aplicação.
  - **app.ts**: Ponto de entrada da aplicação.
  - **components/**: Contém os componentes React.
    - **Dashboard.tsx**: Componente que exibe o status geral dos repositórios.
    - **RepositoryCard.tsx**: Componente que representa um repositório individual.
    - **StatusIndicator.tsx**: Componente que mostra o status do repositório.
  - **services/**: Contém serviços para interagir com a API do GitHub.
    - **githubApi.ts**: Funções para buscar informações sobre repositórios.
    - **statusService.ts**: Funções para processar e formatar dados da API.
  - **types/**: Contém tipos e interfaces utilizados no projeto.
    - **index.ts**: Tipos e interfaces.
  - **utils/**: Contém funções utilitárias.
    - **helpers.ts**: Funções para tarefas comuns.

- **public/**: Contém arquivos públicos.
  - **index.html**: Documento HTML principal.

- **tsconfig.json**: Configuração do TypeScript.

- **package.json**: Configuração do npm.

## Instalação

1. Clone o repositório:
   ```
   git clone https://github.com/seu-usuario/repository-dashboard.git
   ```

2. Navegue até o diretório do projeto:
   ```
   cd repository-dashboard
   ```

3. Instale as dependências:
   ```
   npm install
   ```

## Uso

Para iniciar a aplicação, execute o seguinte comando:
```
npm start
```

A aplicação estará disponível em `http://localhost:3000`.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a MIT License. Veja o arquivo LICENSE para mais detalhes.