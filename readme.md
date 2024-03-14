<p align="center"><a href="https://inicie.digital/" target="_blank"><img src="https://attachments.gupy.io/production/companies/24820/career/54823/images/2024-01-04_14-13_companyLogoUrl.png" width="150" alt="Inicie Logo"></a></p><p align="center"><img src="https://archives.bulbagarden.net/media/upload/4/4b/Pok%C3%A9dex_logo.png" width="400" alt="logo Pokedex"></p>

# Sobre o Projeto

O projeto é uma Pokedex e foi construido para um teste prático na Inicie.
O projeto foi contruido em Angular 17, Laravel 10, MySql e Docker.

# Sobre a API
**API criada para teste na Inicie**

A API tem finalidade de executar operações e obter dados requisitados pelo cliente. 

A API também contém conta com documentação do Swagger.
Para entrar no Swagger basta subir a aplicação (que será falado logo abaixo na sessão do Docker) e entrar no endpoint ```api/doc```

A finalidade da API é retornar dados da API pokeapi.co, obter os dados requisitados, armazenar apenas o necessário e disponibilizar para o SPA (front-end em Angular)


## Sobre o SPA
**SPA criado para teste na Inicie**

A SPA foi contruido em Angular 17. Ele tem a finalidade de absorver os dados da API e montar uma Pokedex com as informações.

## Docker - Estruturação do projeto

O projeto está separado em ```API```, ```SPA``` e ```NGINX```. Cada um está independente, exceto o SPA que depende do NGINX para executar. 
Ao executar o ```docker compose``` todos sobem sequencialmente planejados.

A estrutura conta com as imagens da Api, Spa, MySQL, phpMyAdmin e Nginx.

A Spa como é dependente Nginx, ela cria um volume obtido pelo Dist gerado pelo Angular. O Nginx obtem esse volume e executa a Spa. O container da Spa nunca irá subir, apenas a imagem.

## Docker - Como executar

Para executar o projeto basta ter o [Docker](https://docs.docker.com/get-docker/) instalado na sua máquina.
Após ter o Docker, clone o projeto pelo respositório [GIT](https://github.com/heylucasf/pokedex_inicie) e coloque em uma pasta da sua escolha.

Antes de executar o projeto, altere o os parâmetros de Banco do ```.env``` da ```API```
> ```DB_HOST=mysql``` // Pega o container onde está o banco de dados
>
> ```DB_DATABASE=pokemons``` // Nome do Banco de dados
>
> ```DB_USERNAME=root```
>
> ```DB_PASSWORD=root```
>

Depois de clonado abra algum terminal que execute o Docker, entre no local raiz do projeto clonado e execute os comandos:
> ```docker compose up -d``` //Cria as imagens e sobe os containers em segundo plano
>
> ```docker compose exec api php artisan migrate``` // Vai pedir para criar o Banco de dados Pokemons. Dê sim, com isso ele cria o banco.
>

Depois do Banco de dados criado voce já tem acesso a aplicação nos links abaixo:
> ```localhost``` //Rota Padrao
>
> ```localhost:8000/api/pokedex``` // Rota da listagem de Pokemons na API
>
> ```localhost:8000/api/doc``` // Rota da documentação do Swagger
>

Caso queira acessar o Banco de Dados por alguma aplicação o usuario e senha são ```root```