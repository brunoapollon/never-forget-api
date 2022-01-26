# Never-Forget ✅

## Tecnologias

- [Node](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/pt-br)
- [Javascprit](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)

## Projeto

Esse projeto é uma aplicação node para o cadastro de tarefas com o intuito de gerenciar atividades que devem ser feitas no decorrer dos dias, semanas ou meses.

## Instruções

- Para instalar todas as dependências utilizadas do projeto basta rodar o comando `yarn`
- O servidor pode ser iniciado com `yarn dev`, onde se tem acesso pelo `http://localhost:3333`
- Deve ser criado uma pasta `uploads` na raiz do projeto onde os arquivos serão destinados.
- Você deve criar um arquivo .env e preencher as variáveis requeridas
  e colocar a url do banco de dados mongoDB no local `src/database/index.js`.

## Rotas da aplicação

- `http://localhost:3333/users/` criação de usuário (`POST`).

<h3><strong>Dados requeridos</strong></h3>

```JSON
  {
    "name": "Bruno Lopes",
    "email": "bruno@bruno.com",
    "password": "senha"
  }
```

<br>
<br>

- `http://localhost:3333/users/authentication` autenticação de usuário (`POST`).
<h3><strong>Dados requeridos</strong></h3>

```JSON
  {
    "email": "bruno@bruno.com",
    "password": "123456"
  }
```

<h3><strong>Dados retornados</strong></h3>

```JSON
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQwMDZiZmY1LWUxODEtNDMzYS05YjZmLTllN2JiNTE3NWNkYyIsImlhdCI6MTY0MjUxOTA1NSwiZXhwIjoxNjQyNjA1NDU1LCJzdWIiOiJkMDA2YmZmNS1lMTgxLTQzM2EtOWI2Zi05ZTdiYjUxNzVjZGMifQ.K12r7kPGw6c5Y-qbrsvn3VVOyhHEgCTxqI0aOiQSVQU",
    "user": {
      "id": "d006bff5-e181-433a-9b6f-9e7bb5175cdc",
      "name": "Bruno Lopes",
      "email": "bruno@bruno.com",
      "createdAt": "2022-01-17T15:40:09.921Z",
      "updatedAt": "2022-01-17T15:40:09.921Z"
    }
  }
```

<br>
<br>

- `http://localhost:3333/users/` mostra os dados de um usuário (`GET`) O usuário deve OBRIGATÓRIAMENTE estar autenticado para utilizar essa rota.

<h3><strong>Dados retornados</strong></h3>

```JSON
   {
      "id": "d006bff5-e181-433a-9b6f-9e7bb5175cdc",
      "name": "Bruno Lopes",
      "email": "bruno@bruno.com",
      "createdAt": "2022-01-17T15:40:09.921Z",
      "updatedAt": "2022-01-17T15:40:09.921Z"
    }
```

<br>
<br>

- `http://localhost:3333/users/update` atualização de um usuário (`PATCH`) O usuário deve OBRIGATÓRIAMENTE estar autenticado para utilizar essa rota.
<h3><strong>Dados requeridos</strong></h3>

```JSON
  {
    "email": "bruno@bruno.com",
    "name": "Bruno Vinicius"
  }
```

<h3><strong>Dados retornados</strong></h3>

```JSON
   {
      "id": "d006bff5-e181-433a-9b6f-9e7bb5175cdc",
      "name": "Bruno Lopes",
      "email": "bruno@bruno.com",
      "createdAt": "2022-01-17T15:40:09.921Z",
      "updatedAt": "2022-01-17T15:40:09.921Z"
   }
```

<br>
<br>

- `http://localhost:3333/users/update/password` atualização de senha um usuário (`PUT`) O usuário deve OBRIGATÓRIAMENTE estar autenticado para utilizar essa rota.
<h3><strong>Dados requeridos</strong></h3>

```JSON
  {
    "oldPassword": "123456",
    "newPassword": "654321"
  }
```

<h3><strong>Dados retornados</strong></h3>

```JSON
   {
     "message": "update password successfully"
   }
```

<br>
<br>

- `http://localhost:3333/users/delete_account` exclusão de conta de um usuário (`DELETE`) O usuário deve OBRIGATÓRIAMENTE estar autenticado para utilizar essa rota.

<h3><strong>Dados retornados</strong></h3>

```JSON
  {
    "message": "account deleted successfully"
  }
```
