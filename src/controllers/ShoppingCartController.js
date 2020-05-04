const { Client } = require('pg')
const { celebrate, Segments, Joi } = require('celebrate')

module.exports = {
  async getCartByClient(request, response) {
    const { client_id } = request.params
    let res = {}

    const database = new Client({
      connectionString: process.env.DATABASE_URL
    })

    database
    .connect()
    .then(() => console.log("Database Connected"))
    .then(() => database.query('SELECT shopping_cart.id, shopping_cart.client_id, shopping_cart.store_id, shopping_cart.quantity, products.title, products.price, products.description, products.image, products.current_stock, shopping_cart.created_at FROM shopping_cart JOIN products ON shopping_cart.product_id = products.id WHERE client_id = $1 ORDER BY id;', [client_id]))
    .then(results => res['cart'] = results.rows)
    .catch(e => console.log("Database Error: ", e))
    .finally(() => {
        database.end()
        return response.json(res)
    })
  },
  async addItemToCart(request, response) {
    const {
        client_id,
        store_id,
        product_id,
        quantity
    } = request.body;

    let res = {}

    const database = new Client({
        connectionString: process.env.DATABASE_URL
    })

    database
        .connect()
        .then(() => console.log("Database Connected"))
        .then(() => database.query("SELECT * FROM shopping_cart WHERE client_id = $1 AND product_id = $2", [client_id, product_id]))
        .then(results => {
            if(results.rows[0]) {
                database.query("UPDATE shopping_cart SET quantity = $1 WHERE client_id = $2 AND product_id = $3", [
                    results.rows[0]['quantity'] + quantity,
                    client_id,
                    product_id
                ])
                res['status'] = "OK"
                return response.json(res)
            }
        })
        .then(() => 
            database.query(
                "INSERT INTO shopping_cart(client_id, store_id, product_id, quantity) VALUES($1,$2,$3,$4)",
                [
                  client_id,
                  store_id,
                  product_id,
                  quantity
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
  async updateQuantity(request, response) {
    const {
        id,
        quantity
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
                "UPDATE shopping_cart SET quantity = $1 WHERE id = $2",
                [
                  quantity,
                  id
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
  async deleteItemById(request, response) {
    const { id } = request.params
    let res = {}

    const database = new Client({
      connectionString: process.env.DATABASE_URL
    })

    database
    .connect()
    .then(() => console.log("Database Connected"))
    .then(() => database.query('DELETE FROM shopping_cart WHERE id = $1', [id]))
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
  async deleteItemByClient(request, response) {
    const { client_id } = request.params
    let res = {}

    const database = new Client({
      connectionString: process.env.DATABASE_URL
    })

    database
    .connect()
    .then(() => console.log("Database Connected"))
    .then(() => database.query('DELETE FROM shopping_cart WHERE client_id = $1', [client_id]))
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