const { Client } = require('pg')

module.exports = {
  async getOrders(request, response) {
    let res = {}

    const database = new Client({
      connectionString: process.env.DATABASE_URL
    })

    database
    .connect()
    .then(() => console.log("Database Connected"))
    .then(() => database.query('SELECT * FROM orders ORDER BY id'))
    .then(results => res['orders'] = results.rows)
    .catch(e => console.log("Database Error: ", e))
    .finally(() => {
        database.end()
        return response.json(res)
    })
  },
  async getOrderByClient(request, response) {
    const { client_id } = request.params
    let res = {}

    const database = new Client({
      connectionString: process.env.DATABASE_URL
    })

    database
      .connect()
      .then(() => console.log("Database Connected"))
      .then(() => database.query('SELECT * FROM orders WHERE client_id = $1', [client_id]))
      .then(results => res['orders'] = results.rows)
      .catch(e => console.log("Database Error: ", e))
      .finally(() => {
        database.end()
        return response.json(res)
      })
  },
  async getOrderByStore(request, response) {
    const { store_id } = request.params
    let res = {}

    const database = new Client({
      connectionString: process.env.DATABASE_URL
    })

    database
    .connect()
    .then(() => console.log("Database Connected"))
    .then(() => database.query('SELECT * FROM orders WHERE store_id = $1', [store_id]))
    .then(results => res['orders'] = results.rows)
    .catch(e => console.log("Database Error: ", e))
    .finally(() => {
        database.end()
        return response.json(res)
    })
  },
  async getOrderByStatus(request, response) {
    const { status } = request.params
    let res = {}

    const database = new Client({
      connectionString: process.env.DATABASE_URL
    })

    database
    .connect()
    .then(() => console.log("Database Connected"))
    .then(() => database.query('SELECT * FROM orders WHERE status = $1', [status]))
    .then(results => res['orders'] = results.rows)
    .catch(e => console.log("Database Error: ", e))
    .finally(() => {
        database.end()
        return response.json(res)
    })
  },
  async addOrder(request, response) {
    const {
        client_id,
        store_id,
        order
    } = request.body;

    let res = {}

    const database = new Client({
        connectionString: process.env.DATABASE_URL
    })

    database
        .connect()
        .then(() => console.log("Database Connected"))
        .then(() => 
            database.query(
                "INSERT INTO users(client_id, store_id, order) VALUES($1,$2,$3)",
                [
                  client_id,
                  store_id,
                  order
                ]
            )
        )
        .then(() => {
            res['status'] = "OK"
        })
        .catch(e => {
            res['status'] = "FAIL"
            console.log("Database Error: ", e)
        })
        .finally(() => {
            database.end()
            return response.json(res)
        })
  },
  async deleteOrder(request, response) {
    const { id } = request.params
    let res = {}

    const database = new Client({
      connectionString: process.env.DATABASE_URL
    })

    database
    .connect()
    .then(() => console.log("Database Connected"))
    .then(() => database.query('DELETE FROM orders WHERE id = $1', [id]))
    .then(() => {
        res['status'] = "OK"
    })
    .catch(e => {
        res['status'] = "FAIL"
        console.log("Database Error: ", e)
    })
    .finally(() => {
        database.end()
        return response.json(res)
    })
  }
}