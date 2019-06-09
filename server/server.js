const express = require('express')
const bodyParser = require('body-parser')
const server = express()
const cors = require('cors')

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

module.exports = {
  server
}

// use middlewares
server.use(bodyParser.json())
server.use(cors(corsOptions))

// setup router
require('./routes')

// start app
const PORT = process.env.PORT || 8989
server.listen(PORT, err => {
  if (err) {
    console.log(err)
  } else {
    console.log('Server is up on port', PORT)
  }
})
