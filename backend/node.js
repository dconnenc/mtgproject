const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const cors = require('cors');
const path = require('path');
const port = process.env.PORT || 3001

app.use(cors({
  origin: '*'
}));

app.use(bodyParser.json({limit: "50mb"}))
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

app.get('/api', (req, res) => {
  res.send('Hello World!')
})

app.get('/')
//app.get('/users', db.getUsers)
app.post('/users', db.createUser)
//app.get('/users/:id', db.getUserById)
app.get('/usersCards/:id', db.getUsersCardsById)
app.get('/usersCards/:id/:list', db.getUsersCardsByIdAndList)
app.post('/usersCards/:id/:list', db.createUsersCards)
app.delete('/usersCards/:id/:list', db.deleteUserCards)
app.patch('/usersCards/:id/:list', db.updateCardScores)

app.listen(port, () => {
  console.log(`MyP1P1 is listening on port ${port}`)
})
