const knex = require("knex")
const config = require("../knexfile")["development"]
const database = knex(config);

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})

const getUsers = (_request, response) => {
  database.select().from("users")
    .then(users => {
      response.status(200).json({users})
    });
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  database.select().from("users").where('user_id', id)
    .then(users => {
      response.status(200).json({users})
    })
}

//is this working?
const getUsersCards = (request, response) => {
  const id = parseInt(request.params.id)

  database.select().from("cards").where('user_id', id)
    .then(users => {
      response.status(200).json({card})
    })
}

const createUsersCards = (request, response) => {
  const { user_id, cards, listName } = request.body; 
  
  database('cards').insert({
    user_id: user_id,
    cards: cards,
    list: listName
  })
  .then(card => {
    response.status(200).json({card})
  })
}

const createUser = (request, response) => {
  const { name, email, user_id } = request.body;

  database('users').insert({
    name: name,
    email: email,
    user_id: user_id
  }).onConflict('user_id').ignore()
  .then(user => {
    response.status(200).json({user})
  })
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  kdatabase('users').where('user_id', id).del()
  .then(user => {
    response.status(200).json({user})
  });
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  getUsersCards,
  deleteUser,
  createUsersCards
}