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

### 2. Configuração do banco de dados com Docker
Certifique-se de ter o **Docker** instalado. Em seguida, execute o seguinte comando para iniciar o banco de dados MySQL em um container Docker:

docker-compose up -d

## Rodando o servidor
Para rodar o servidor Express, use o seguinte comando:

npm start

## Executando os testes
Execute os testes para garantir que todas as funcionalidades estão funcionando corretamente:

npm test