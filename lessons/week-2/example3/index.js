const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const PORT = 3001

app.use(bodyParser.json())

app.get('/', (request, response) => {
  response.send("Hi World!")
})

app.get('/name', (request, response) => {
  response.send('Alyssa Ciccone')
})

app.get('/mailbox', (req, res) => {
  res.json({
    firstName: 'Alyssa',
    lastName: 'Ciccone'
  })
})

app.listen(PORT, () => console.log(`App listening on port ${PORT}`))
