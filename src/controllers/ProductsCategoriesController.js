const { Client } = require('pg')
const encode = 'utf8'

module.exports = {
    async getProductsCategories(request, response) {
        let res = {}

        const database = new Client({
            connectionString: process.env.DATABASE_URL,
            client_encoding: encode
        })

        database
            .connect()
            .then(() => console.log("Database Connected"))
            .then(() => database.query('SELECT * FROM product_category ORDER BY id'))
            .then(results => res['categories'] = results.rows)
            .catch(e => console.log("Database Error: ", e))
            .finally(() => {
                database.end()
                
                response.set('Content-Type', 'application/json; charset=iso-8859-1')
                json = JSON.stringify(res)
                jsonBuffer = Buffer.from(json, 'latin1')
                return response.send(jsonBuffer)
            })
    },
    async getProductCategoryById(request, response) {
        const { id } = request.params
        let res = {}

        const database = new Client({
            connectionString: process.env.DATABASE_URL,
            client_encoding: encode
        })

        database
            .connect()
            .then(() => console.log("Database Connected"))
            .then(() => database.query('SELECT * FROM product_category WHERE id = $1', [id]))
            .then(results => {
                if(results.rows[0]) {
                    res = results.rows[0]
                }
            })
            .catch(e => console.log("Database Error: ", e))
            .finally(() => {
                database.end()
                
                response.set('Content-Type', 'application/json; charset=iso-8859-1')
                json = JSON.stringify(res)
                jsonBuffer = Buffer.from(json, 'latin1')
                return response.send(jsonBuffer)
            })
    },
    async addProductCategory(request, response) {
        const {
            title,
            description
        } = request.body;

        let res = {}

        const database = new Client({
            connectionString: process.env.DATABASE_URL,
            client_encoding: encode
        })

        database
            .connect()
            .then(() => console.log("Database Connected"))
            .then(() => 
                database.query(
                    "INSERT INTO product_category(title, description) VALUES($1,$2)",
                    [
                        title,
                        description
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
                
                response.set('Content-Type', 'application/json; charset=iso-8859-1')
                json = JSON.stringify(res)
                jsonBuffer = Buffer.from(json, 'latin1')
                return response.send(jsonBuffer)
            })
    }
}