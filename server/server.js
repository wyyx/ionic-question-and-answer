const express = require('express')
const bodyParser = require('body-parser')
const server = express()

module.exports = {
  server
}

// setup router
require('./routes')

// use middlewares
server.use(bodyParser.json())

// start app
const PORT = process.env.PORT || 3000
server.listen(PORT, err => {
  if (err) {
    console.log(err)
  } else {
    console.log('Server is up on port', PORT)
  }
})
