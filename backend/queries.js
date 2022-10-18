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
  const id = request.params.id
  database.select().from("users").where('user_id', id)
    .then(users => {
      response.status(200).json({users})
    })
}

const getUsersCardsById = (request, response) => {
  const id = request.params.id;
  database.select().from("cards").where('id', id)
    .then(cards => {
      response.status(200).json({cards})
    })
}

const getUsersCards = (request, response) => {

  database.select().from("cards")
    .then(cards => {
      response.status(200).json({cards})
    })
}

const createUsersCards = (request, response) => {
  const { user_id, cards, listName } = request.body;

  database('cards').insert({
    user_id: user_id,
    cards: cards,
    list: listName
  })
  .then(cards => {
    response.status(200).json({cards})
  })
}

const createUser = (request, response) => {
  const { name, email, user_id } = request.body;

  database('users').insert({
    name: name,
    email: email,
    user_id: user_id
  })
    .returning('*')
    .onConflict('user_id')
    .merge()
    .then((user) => {
      return response.status(200).json(user)
    })
}

const deleteUserCards = (request, response) => {
  const id = request.params.id;
  const description = request.params.description;

  database('cards').where('user_id', id).where('list', description).del()
  .then(user => {response.status(200).json({user})
  });
}

const updateCardScores = (request, response) => {
  const id = request.params.id;
  const description = request.params.description;

  database('cards').where('user_id', id).where('list', description).update({
    //is it possible to find the score with my current data set?
  })
  .then(card => {
    response.status(200).json({card})
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  getUsersCards,
  getUsersCardsById,
  deleteUserCards,
  createUsersCards,
  updateCardScores
}
