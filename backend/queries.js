const knex = require("knex")
const config = require("../knexfile")[process.env.NODE_ENV || "development"]
const database = knex(config);

const Pool = require('pg').Pool

if (process.env.NODE_ENV === "production") {
  const pool = new Pool({
    connectionString: `${process.env.DATABASE_URL}?sslmode=require`,
    ssl: {
      rejectUnauthorized: false
    }
  });
} else {
  const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: 5432,
  })
}


//dead end to trouble shoot backend
const getUsers = (_request, response) => {
  database.select().from("users")
    .then(users => {
      response.status(200).json({users})
    });
} 

//api runs this after auth0 authentication and assigns identity
const getUserById = (request, response) => {
  const id = request.params.id
  database.select().from("users").where('external_id', id)
    .then(user => {
      response.status(200).json({user})
    })
}


const createUser = (request, response) => {
  const { name, email, external_id } = request.body;

  database('users').insert({
    name: name,
    email: email,
    external_id: external_id
  })
    .returning('*')
    .onConflict('external_id')
    .merge()
    .then((user) => {
      return response.status(200).json(user)
    })
}

const getUsersCardsById = (request, response) => {
  const id = request.params.id;

  database.select("*").from("cards").where('user_id', id)
    .then(cards => {
      response.status(200).json({cards})
    })
}

const getUsersCardsByIdAndList = (request, response) => {
  const user_id = request.params.id;
  const list = request.params.list;

  database.select("*").from("cards").where({ user_id, list })
    .then(cards => {
      response.status(200).json({cards})
    })
}

const createUsersCards = (request, response) => {
  const user_id = request.params.id;
  const listName = request.params.description;
  const cards = request.body

  database('cards').insert({
    user_id: user_id,
    cards: cards,
    list: listName
  })
  .then(cards => {
    response.status(200).json({cards})
  })
}



const deleteUserCards = (request, response) => {
  const id = request.params.id;
  const description = request.params.description;

  database('cards').where('user_id', id).andWhere('list', description).del()
  .then(user => {response.status(200).json({user})
  });
}

const updateCardScores = (request, response) => {
  const id = request.params.id;
  const description = request.params.description;
  const cards = request.body;

  database('cards').where('user_id', id).andWhere('list', description)
  .update({"cards": cards}, ['id', 'cards'])
  .then(card => {
    response.status(200).json({card})
  })
}

module.exports = {
  //getUsers,
  getUserById,
  createUser,
  getUsersCardsById,
  deleteUserCards,
  createUsersCards,
  updateCardScores,
  getUsersCardsByIdAndList
}
