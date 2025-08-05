## Descrição

Projeto back-end for front-end (BFF) para o desafio técnico LuizaLabs.

## Rodando a aplicão

### 1. Instale as dependências

```bash
$ npm install
```

### 2. Configure as variáveis de ambiente

Para rodar a aplicação em modo desenvolvimento, é necessário adicionar algumas variáveis de ambinte.

Crie um arquivo `.env` na raiz deste projeto.

Adicione as variáveis abaixo preenchendo os valores para as variáveis `SPOTFY_CLIENT_ID`, `SPOTFY_CLIENT_SECRET` e `SPOTFY_REDIRECT_URI` com os dados da aplicção criada no dashboard do Spotfy.

```
# ./.env

SPOTFY_CLIENT_ID=
SPOTFY_CLIENT_SECRET=
SPOTFY_REDIRECT_URI=
SPOTFY_ACCOUNTS_URL=https://accounts.spotify.com
SPOTFY_API_URL=https://api.spotify.com/v1
PORT=3001
```

### 3. Iniciar o projeto em desenvolvimento

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Deployment com Docker

Necessário ter o Docker instalado. Caso precise instalar, siga as [instruções de instalação](https://docs.docker.com/engine/install/) nos manuais oficiais do Docker. Após instalar, siga as instruções abaixo para construir e iniciar a aplicação.

### 1. Crie a rede

Para que o bff se comunique com o front-end, é necessário criar uma rede para conectar os containers.

Crie a rede `spotfy-luizalabs` com o comando abaixo.

```bash
docker network create spotfy-luizalabs
```

### 2. Construa a imagem

Utilize o comando abaixo para construir a imagem com o nome de `spotfy-luizalabs-fe`.

```bash
docker build -t spotfy-luizalabs-bff .
```

### 3. Inicie a aplicação

Inicie um container com a imagem criada no passo anterior usando o comando a seguir.

```bash
docker run -d --name spotfy-luizalabs-bff \
  --network spotfy-luizalabs \
  -p 3001:3001 \
  --env-file .env \
  spotfy-luizalabs-bff
```
