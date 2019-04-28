const axios = require('axios')
const { server } = require('../server')

server.get('/api/feeds/get', (req, res) => {
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
