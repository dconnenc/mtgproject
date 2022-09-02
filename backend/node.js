const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const cors = require('cors');
const port = 3001

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(cors({
  origin: '*'
})); 

app.get('/api', (req, res) => {
  res.send('Hello World!')
})

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
