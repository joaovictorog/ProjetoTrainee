# Projeto Trainee (grupo 4) - Serviço de Streaming - CRUD de Música, Usuário, Artista e Álbum

## Descrição

Este é um serviço de streaming de músicas implementado com **Node.js (Express)**, utilizando o banco de dados **MySQL** para armazenar dados de músicas, usuários, artistas e álbuns. O projeto inclui a implementação de operações CRUD para essas entidades e é containerizado com **Docker** para facilitar a configuração e o ambiente de desenvolvimento.

## Tecnologias Utilizadas

- **Node.js** com **Express** para o backend
- **Prisma** como ORM para interação com o banco de dados MySQL
- **MySQL** como banco de dados relacional
- **Docker** para containerização da aplicação
- **Jest** para testes unitários
- **Prisma Migrate** para migração do banco de dados

## Instalação

### 1. Clone o repositório

git clone https://github.com/joaovictorog/ProjetoTrainee.git
cd ProjetoTrainee

### 2. Crie o arquivo .env

Na raiz do diretório, crie o arquivo **.env** e adicione a seguinte estrutura:

```env
PORT = 3030
SECRET_KEY = "mySecretKey"
JWT_EXPIRATION = "3600"
NODE_ENV = "development"
APP_URL="http://localhost:3000/"
DATABASE_PORT="3306"
MYSQL_ROOT_PASSWORD=12345
DATABASE_NAME="projetotrainee"
DATABASE_URL="mysql://root:${MYSQL_ROOT_PASSWORD}@mysql:${DATABASE_PORT}/${DATABASE_NAME}"

### 2. Configuração do banco de dados com Docker
Certifique-se de ter o **Docker** instalado. Em seguida, execute o seguinte comando para iniciar os containers Docker da api e do MySQL:

docker-compose up -d

Dentro do container da api, use o seguinte comando para que o banco de dados MySQL seja criado: 

npx prisma db push

Ao entrar no container do MySQL, é necessário logar no mysql. Para isso, use o seguinte comando 

mysql -u root -p 

e insira sua senha definida no .env

Após isso, é necessário criar um primeiro usuário com permissões de admin. Use o seguinte comando:

INSERT INTO Usuario VALUES(1, 'admin@email.com', 'admin', 'senha', true, 'foto.png');

Ainda no container do MySQL, ao realizar login de usuário, deve-se reiniciar o container antes de fazer outras requests. Para isso, execute o comando: 

docker restart api

## Executando os testes
Execute os testes para garantir que todas as funcionalidades estão funcionando corretamente:

npm test