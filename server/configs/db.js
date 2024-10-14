var Knex = require('knex')

let db = null

if (process.env.Node_ENV === 'test') {
  db = Knex({
    client: 'sqlite3',
    connection: {
      filename: ':memory:',
    },
    useNullAsDefault: true,
    migrations: {
      tableName: 'migrations',
      directory: '../migrations'
    },
  })
} else {
  db = Knex({
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      port: parseInt(process.env.DB_PORT || 5432, 10)
    },
    migrations: {
      tableName: 'migrations',
      directory: '../migrations'
    },
  })
}

module.exports = db