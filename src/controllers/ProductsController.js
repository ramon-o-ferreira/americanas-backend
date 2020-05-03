const { Client } = require('pg')

module.exports = {
    async getProducts(request, response) {
        let res = {}

        const database = new Client({
            connectionString: process.env.DATABASE_URL
        })

        database
            .connect()
            .then(() => console.log("Database Connected"))
            .then(() => database.query('SELECT * FROM products ORDER BY id'))
            .then(results => res['products'] = results.rows)
            .catch(e => console.log("Database Error: ", e))
            .finally(() => {
                database.end()
                return response.json(res)
            })
    },
    async getProductById(request, response) {
        const { id } = request.params
        let res = {}

        const database = new Client({
            connectionString: process.env.DATABASE_URL
        })

        database
            .connect()
            .then(() => console.log("Database Connected"))
            .then(() => database.query('SELECT * FROM products WHERE id = $1', [id]))
            .then(results => {
                if(results.rows[0]) {
                    res = results.rows[0]
                }
            })
            .catch(e => console.log("Database Error: ", e))
            .finally(() => {
                database.end()
                return response.json(res)
            })
    },
    async getProductByCategory(request, response) {
        const { category_id } = request.params
        let res = {}

        const database = new Client({
            connectionString: process.env.DATABASE_URL
        })

        database
            .connect()
            .then(() => console.log("Database Connected"))
            .then(() => database.query("SELECT * FROM products WHERE category_id = $1", [category_id]))
            .then(results => res['products'] = results.rows)
            .catch(e => console.log("Database Error: ", e))
            .finally(() => {
                database.end()
                return response.json(res)
            })
    },
    async getProductByOwner(request, response) {
        const { owner_id } = request.params
        let res = {}

        const database = new Client({
            connectionString: process.env.DATABASE_URL
        })

        database
            .connect()
            .then(() => console.log("Database Connected"))
            .then(() => database.query('SELECT * FROM products WHERE owner_id = $1', [owner_id]))
            .then(results => res['products'] = results.rows)
            .catch(e => console.log("Database Error: ", e))
            .finally(() => {
                database.end()
                return response.json(res)
            })
    },
    async addProduct(request, response) {
        const {
            category_id,
            title,
            price,
            description,
            image,
            current_stock,
            minimun_stock,
            owner_id
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
                    "INSERT INTO products(category_id, title, price, description, image, current_stock, minimun_stock, owner_id) VALUES($1,$2,$3,$4,$5,$6,$7,$8)",
                    [
                        category_id,
                        title,
                        price,
                        description,
                        image,
                        current_stock,
                        minimun_stock,
                        owner_id
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
    async updateProductStock(request, response) {
        const { id, new_value } = request.params
        let res = {}

        const database = new Client({
            connectionString: process.env.DATABASE_URL
        })

        database
            .connect()
            .then(() => console.log("Database Connected"))
            .then(() => database.query('UPDATE products SET current_stock = $1 WHERE id = $2', [new_value, id]))
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