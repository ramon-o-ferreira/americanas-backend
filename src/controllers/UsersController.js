const { Client } = require('pg')

module.exports = {
    async getUsers(request, response) {
        let res = {}

        const database = new Client({
            connectionString: process.env.DATABASE_URL
        })

        database
            .connect()
            .then(() => console.log("Database Connected"))
            .then(() => database.query('SELECT * FROM users ORDER BY id'))
            .then(results => res['users'] = results.rows)
            .catch(e => console.log("Database Error: ", e))
            .finally(() => {
                console.log(res)
                database.end()
                return response.json(res)
            })
    },
    async getStores(request, response) {
        let res = {}

        const database = new Client({
            connectionString: process.env.DATABASE_URL
        })

        database
            .connect()
            .then(() => console.log("Database Connected"))
            .then(() => database.query('SELECT * FROM users WHERE is_store = true ORDER BY id'))
            .then(results => res['stores'] = results.rows)
            .catch(e => console.log("Database Error: ", e))
            .finally(() => {
                database.end()
                return response.json(res)
            })
    },
    async getClients(request, response) {
        let res = {}

        const database = new Client({
            connectionString: process.env.DATABASE_URL
        })

        database
            .connect()
            .then(() => console.log("Database Connected"))
            .then(() => database.query('SELECT * FROM users WHERE is_store = false ORDER BY id'))
            .then(results => res['clients'] = results.rows)
            .catch(e => console.log("Database Error: ", e))
            .finally(() => {
                database.end()
                return response.json(res)
            })
    },
    async getUserById(request, response) {
        const { id } = request.params
        let res = {}

        const database = new Client({
            connectionString: process.env.DATABASE_URL
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
                return response.json(res)
            })
    },
    async getUserByEmail(request, response) {
        const { email } = request.params
        let res = {}

        const database = new Client({
            connectionString: process.env.DATABASE_URL
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
                return response.json(res)
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
            connectionString: process.env.DATABASE_URL
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
                return response.json(res)
            })
    }
}