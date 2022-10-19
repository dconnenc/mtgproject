// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'pg',
    connection: {
      user: 'postgres',
      host: 'localhost',
      database: 'api',
      password: 'password',
      port: 5432,
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
