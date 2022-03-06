//import the Sequelize constructor from the library
const Sequelize = require('sequelize');

//load .env into connection.js file
require('dotenv').config();

//server port
const PORT = process.env.PORT || 3001;

//connection to database
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
});

module.exports = sequelize;