const axios = require('axios')
const { server } = require('../server')
server.get('/', (req, res) => {
  console.log('/', req.path)
})

// register
server.get('/api/account/register', (req, res) => {
  const url = 'https://imoocqa.gugujiankong.com' + req.path

  axios
    .get(url, { params: req.query })
    .then(response => {
      res.json(response.data)
    })
    .catch(e => {
      console.log(e)
      res.json(e)
    })
})

// login
server.get('/api/account/login', (req, res) => {
  const url = 'https://imoocqa.gugujiankong.com' + req.path
  console.log('TCL: url', url)

  axios
    .get(url, { params: req.query })
    .then(response => {
      res.json(response.data)
    })
    .catch(e => {
      console.log(e)
      res.json(e)
    })
})

// get user info
server.get('/api/account/userinfo', (req, res) => {
  const url = 'https://imoocqa.gugujiankong.com' + req.path
  console.log('TCL: url', url)

  axios
    .get(url, { params: req.query })
    .then(response => {
      res.json(response.data)
    })
    .catch(e => {
      console.log(e)
      res.json(e)
    })
})
