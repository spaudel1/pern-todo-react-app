
require('dotenv').config()
const Pool = require('pg').Pool

const pool = new Pool( {
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE
})

module.exports = pool