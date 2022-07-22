# DBM Money

## Prototipagem
Os protótipos criados estão disponíveis no [Figma](https://www.figma.com/file/uE4ttHlxdNORl51ilv8rxB/DBMoney?node-id=0%3A1).

## Ferramentas utilizadas

As tecnologias utilizadas foram: 

- [HTML]()
- [CSS]()
- [Node.js](https://nodejs.org/en/)
- [Express](http://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Cors](https://www.npmjs.com/package/cors)

## Criando o banco de dados
Antes de criar a tabela, é necessário a instalação do [MySQL Workbench](https://dev.mysql.com/downloads/installer/). Após a instalação completa, abra o [MySQL Workbench](https://dev.mysql.com/downloads/installer/) e execute o script create-db-dbmoney.sql na pasta backend/src/database. Em seguida, execute o script initialize-gerente.sql na mesma pasta.

## Executando o servidor
Para rodar o servidor, execute no seu terminal:

```
$ cd backend/
```
```
$ node src/app.js
```

## Executando a aplicação
Para rodar a aplicação, abra o arquivo index.html na pasta templates. 
