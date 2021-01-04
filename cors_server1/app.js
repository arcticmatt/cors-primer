const express = require('express')
const app = express()
const port = 3001

app.get('/', (_req, res) => {
  res.send('Hello World!')
})

app.post('/test', (_req, res) => {
  res.send({path: '/test'});
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})