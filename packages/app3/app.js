const path = require('path')
const express = require('express')
const app = express()

const PORT = 3003

app.use(`/app1`, express.static(path.join(__dirname, '../app1/dist')))

app.use(`/app2`, express.static(path.join(__dirname, '../app2/dist')))

app.use(`/app3`, express.static(path.join(__dirname, 'dist')))

app.use(`/lib-app`, express.static(path.join(__dirname, '../lib-app/dist')))

app.get(`*`, (req, res) => {
  res.sendFile(__dirname + `/dist/index.html`, {
    maxAge: 0
  })
})

app.listen(PORT, () => {
  console.log(`Application is listening at http://localhost:${PORT}`)
})
