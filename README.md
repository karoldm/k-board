# K-board 

Aplicação para Gerenciamento de Projetos e Tarefas em um Quadro Kanban! Desenvolvido utilizando ReactJS e TypeScript para proporcionar uma experiência fluida e intuitiva para os usuários :)

## Funcionalidades

### Autenticação e Autorização
- **Cadastro de Usuários**: Permite que novos usuários se cadastrem informando nome, email, senha e foto de perfil
- **Login**: Autenticação integrada com a API utilizando JWT

### Projetos
- **Criação de Projetos**: Permite a criação de novos projetos
- **Convite de Membros**: Permite que usuários se juntem a projetos através do compartilhamento do ID do projeto
- **Gerenciamento de Projetos**: Interface para gerenciar os projetos e acompanhar seu progresso

### Tarefas
- **Criação de Tarefas**: Permite adicionar novas tarefas aos projetos
- **Movimentação de Tarefas**: Arraste e solte para mover tarefas entre as colunas do quadro Kanban e acompanhar o progresso das mesmas
- **Exclusão**: Possibilidade de excluir tarefas conforme necessário

## Tecnologias e Ferramentas Utilizadas

- **ReactJS**: Biblioteca principal para desenvolvimento da interface (saiba mais em [React](https://react.dev/))
- **TypeScript**: Para um código mais seguro e tipado (saiba mais em [Typescript](https://www.typescriptlang.org/))
- **React Query**: Gerenciamento de estado assíncrono e cache de requisições (saiba mais em [React Query](https://tanstack.com/query/latest))
- **Axios**: Para comunicação eficiente com a API (saiba mais em [Axios](https://axios-http.com/ptbr/docs/intro))
- **React Bootstrap**: Para estilização e componentes responsivos (saiba mais em [React Boostrap](https://react-bootstrap.netlify.app/))

## Como Executar o Projeto

### Pré-requisitos
- Node.js 18+
- Yarn

### Instalação e Execução

1. **Clone o repositório**:
   ```bash
   git clone git@github.com:karoldm/k-board.git
   cd k-board
   ```

2. **Instale as dependências**:
   ```bash
   yarn
   ```

3. **Configure as variáveis de ambiente** (crie um arquivo `.env` na raiz do projeto):
   ```env
   REACT_APP_API_URL=http://localhost:8080
   REACT_APP_STORAGE_KEY=auth_token
   ```

4. **Inicie o projeto**:
   ```bash
   yarn start
   ```
   - O frontend estará disponível em http://localhost:3000.

## Deploy
Projeto hospedado no [Render](https://render.com/)

## Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests ❤️

