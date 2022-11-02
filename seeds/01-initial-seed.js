/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const fs = require("fs");
const { json } = require("stream/consumers");

exports.seed = async function(knex) {
  console.log("trying to load")
  const json = fs.readFileSync(
    "/Users/dilloncassidy/Documents/GitHub/mtgproject/seeds/MTGOVintageCube.json",
    "utf8"
  );
  
  // Deletes ALL existing entries
  await knex('cards').del()
  await knex('users').del()
  
  await knex('users').insert([
    {id: -1, name: 'system', email: 'system@email.com', external_id: "-1" },
  ]);
  
  await knex('cards').insert([
    {id: -1, cards: json, list: 'default', user_id: -1 },
  ]);
};

