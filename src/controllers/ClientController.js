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
            .then(() => database.query('SELECT * FROM clientes ORDER BY id'))
            .then(results => res['users'] = results.rows)
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
            .then(() => database.query('SELECT * FROM clientes WHERE id = $1', [id]))
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
            .then(() => database.query("SELECT * FROM clientes WHERE email = $1", [email]))
            .then(results => {
                if(results.rows[0]) {
                    res = results.rows[0]
                    console.log(results.rows[0])
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
            username,
            document,
            image,
            email,
            password,
            address,
            birthday,
            created_at,
            updated_at
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
                    "INSERT INTO clientes(username, document, image, email, password, address, birthday, created_at, updated_at) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)",
                    [
                        username,
                        document,
                        image,
                        email,
                        password,
                        address,
                        birthday,
                        created_at,
                        updated_at
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