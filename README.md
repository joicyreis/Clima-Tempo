# Clima-Tempo
Trabalho prático disciplina de Modelagem de Software.
Aplicação para consultar a previsão do tempo em cidades brasileiras.

# Como usar?

Clone este repositório.

Entre na pasta do projeto e execute o comando abaixo para instalar as dependências:

`npm install`

Acesse o site https://openweathermap.org/api, faça seu cadastro e crie uma chave de API.

Insira sua `api_key` no diretório `src/domain/cidades.js`, na linha 2, da seguinte maneira:
`const chave = '<api_key>`


Para abrir a aplicação, execute o comando:

`npm run serve`

Acesse a rota: `localhost:<porta>`