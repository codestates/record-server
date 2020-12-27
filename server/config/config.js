//config.json -> config.js로 rename 후, require와 module.exports 가능
require('dotenv').config();

module.exports = {
  // "development": {
  //   "username": process.env.USER,
  //   "password": process.env.PASSWORD,
  //   "database": 'record',
  //   "host": process.env.HOST,
  //   "dialect": "mysql"
  // },
  // "test": {
  //   "username": "root",
  //   "password": null,
  //   "database": "database_test",
  //   "host": "127.0.0.1",
  //   "dialect": "mysql"
  // },
  "production": {
      "username": process.env.USER,
      "password": process.env.PASSWORD,
      "database": 'record',
      "host": process.env.HOST,
      "port": process.env.PORT,
      "dialect": "mysql"
    }
}
