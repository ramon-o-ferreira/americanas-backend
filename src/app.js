const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const { errors } = require('celebrate')
const { Client } = require('pg')
const app = express()

const db = new Client({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE
})
/**
* Exemplo de uso do Postgres:
* db.connect()
* .then(() => console.log("Postgres conectado"))
* .then(() => db.query("select * from usuarios"))
* .then(results => console.table(results.rows))
* .catch(e => console.log(e))
* .finally(() => { db.end(); console.log("Postgres desconectado"); })
*/

app.use(cors()) /* está 'app.use(cors())', porque estamos em desenv, caso fosse para produção seria "app.use(cors({ origin: 'url de hospedagem' }))" */
app.use(express.json())
app.use(routes)
app.use(errors())

module.exports = app

/**
 * Rota / Recurso
 */

/**
 * Métodos HTTP:
 * 
 * GET: Buscar/listar uma informação do back-end
 * POST: Criar uma informação no back-end
 * PUT: Alterar uma informação no back-end
 * DELETE: Deletar uma informação no back-end
 */

 /**
  * Tipos de parametros:
  * 
  * Query params: Parâmetros nomeados enviados na rota após "?" (filtros, paginação)
  * Route params: Parâmetros utilizados para identificar recursos
  * Request body: Corpo da requsição, utilizado para criar ou alterar recursos
  */

/**
 * SQL: MySQL, SQLite, PstgresSQL, Oracle, Microsoft SQL Server
 * NoSQL: MongoDB, CouchDB, etc...
 */

/**
 * Driver:
 */