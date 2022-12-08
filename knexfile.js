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
      //congrats, you can really do some damage now =)
      password: 'password',
      port: 5432,
    }
  },
  production: {
    client: 'pg',
    ssl: true,
    connection: process.env.DATABASE_URL
  }
};
