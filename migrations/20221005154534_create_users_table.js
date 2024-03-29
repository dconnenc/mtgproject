const { takeCoverage } = require("v8");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }   
 */
exports.up = function(knex) {
  return Promise.all([
    //defines user table with command line call
    //"npx knex migrate:latest" >> creates database
    knex.schema.createTable('users', function(table){
        table.increments(); 
        table.string('name').notNullable();
        table.string('email').unique().notNullable();
        table.string('external_id').unique().notNullable();
     }),

    //defines cards table
    knex.schema.createTable('cards', function(table){
        table.increments(); 
        table.text('cards').notNullable();
        table.string('list').notNullable();
        table.integer('user_id').references('id').inTable('users').notNullable();
    })
    ])
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) { 
    return Promise.all([
        knex.schema.dropTable('users'),
        knex.schema.dropTable('cards')
    ])
};
