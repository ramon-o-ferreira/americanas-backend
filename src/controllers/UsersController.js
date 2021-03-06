const { Client } = require('pg')
const encode = 'utf8'

module.exports = {
    async getUsers(request, response) {
        let res = {}

        const database = new Client({
            connectionString: process.env.DATABASE_URL,
            client_encoding: encode
        })

        database
            .connect()
            .then(() => console.log("Database Connected"))
            .then(() => database.query('SELECT * FROM users ORDER BY id'))
            .then(results => res['users'] = results.rows)
            .catch(e => console.log("Database Error: ", e))
            .finally(() => {
                database.end()

                response.set('Content-Type', 'application/json; charset=iso-8859-1')
                json = JSON.stringify(res)
                jsonBuffer = Buffer.from(json, 'latin1')
                return response.send(jsonBuffer)
            })
    },
    async getStores(request, response) {
        let res = {}

        const database = new Client({
            connectionString: process.env.DATABASE_URL,
            client_encoding: encode
        })

        database
            .connect()
            .then(() => console.log("Database Connected"))
            .then(() => database.query('SELECT * FROM users WHERE is_store = true ORDER BY id'))
            .then(results => res['stores'] = results.rows)
            .catch(e => console.log("Database Error: ", e))
            .finally(() => {
                database.end()

                response.set('Content-Type', 'application/json; charset=iso-8859-1')
                json = JSON.stringify(res)
                jsonBuffer = Buffer.from(json, 'latin1')
                return response.send(jsonBuffer)
            })
    },
    async getClients(request, response) {
        let res = {}

        const database = new Client({
            connectionString: process.env.DATABASE_URL,
            client_encoding: encode
        })

        database
            .connect()
            .then(() => console.log("Database Connected"))
            .then(() => database.query('SELECT * FROM users WHERE is_store = false ORDER BY id'))
            .then(results => res['clients'] = results.rows)
            .catch(e => console.log("Database Error: ", e))
            .finally(() => {
                database.end()
                
                response.set('Content-Type', 'application/json; charset=iso-8859-1')
                json = JSON.stringify(res)
                jsonBuffer = Buffer.from(json, 'latin1')
                return response.send(jsonBuffer)
            })
    },
    async getUserById(request, response) {
        const { id } = request.params
        let res = {}

        const database = new Client({
            connectionString: process.env.DATABASE_URL,
            client_encoding: encode
        })

        database
            .connect()
            .then(() => console.log("Database Connected"))
            .then(() => database.query('SELECT * FROM users WHERE id = $1', [id]))
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
    async getUserByEmail(request, response) {
        const { email } = request.params
        let res = {}

        const database = new Client({
            connectionString: process.env.DATABASE_URL,
            client_encoding: encode
        })

        database
            .connect()
            .then(() => console.log("Database Connected"))
            .then(() => database.query("SELECT * FROM users WHERE email = $1", [email]))
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
    async addUser(request, response) {
        const {
            name,
            email,
            password,
            address,
            document,
            birthday,
            image,
            is_store
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
                    "INSERT INTO users(name, email, password, address, document, birthday, image, is_store) VALUES($1,$2,$3,$4,$5,$6,$7,$8)",
                    [
                        name,
                        email,
                        password,
                        address,
                        document,
                        birthday,
                        image,
                        is_store
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