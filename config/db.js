const mysql = require("mysql2")
require("dotenv").config()

const pool = mysql.createPool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST
})

module.exports = pool.promise()

