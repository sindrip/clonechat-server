// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
        directory: __dirname + '/db/migrations'
    },
    seeds: {
        directory: __dirname + '/db/seeds/development'
    }
},

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 0,
      max: 10
    },
    migrations: {
        directory: __dirname + '/db/migrations'
    },
    seeds: {
        directory: __dirname + '/db/seeds/development'
    }
  }

};
