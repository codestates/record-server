//config.json -> config.js로 rename 후, require와 module.exports 가능
require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": 'record',
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "dialect": "mysql",
    "logging": false
  },
  "test": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": 'record',
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "dialect": "mysql"
  },
  "production": {
      "username": process.env.DB_USER,
      "password": process.env.DB_PASSWORD,
      "database": 'record',
      "host": process.env.DB_HOST,
      "port": process.env.DB_PORT,
      "dialect": "mysql"
    }
}
