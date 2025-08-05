## Descrição

Spotfy Luizalabs

## Instale as dependências

```bash
$ npm install
```

## Compilar e iniciar o projeto

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Deployment com Docker

### Crie a rede

```bash
docker network create spotfy-luizalabs
```

### Construa a aplicação

```bash
docker build \
  --network spotfy-luizalabs \
  -t spotfy-luizalabs-bff .
```

### Inicie a aplicação

```bash
docker run -d --name spotfy-luizalabs-bff \
  --network spotfy-luizalabs \
  -p 3001:3001 \
  --env-file .env \
  spotfy-luizalabs-bff
```
