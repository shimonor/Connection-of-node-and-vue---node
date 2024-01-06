const Sequelize = require("sequelize")
require("dotenv").config();

const sequelize = new Sequelize({
     username: process.env.USER,
     password: process.env.PASSWORD,
     database: process.env.DATABASE,
     host: process.env.HOST,
     dialect: "mysql"
})

module.exports = sequelize