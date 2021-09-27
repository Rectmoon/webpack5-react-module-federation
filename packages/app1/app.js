const path = require('path')
const express = require('express')
const app = express()

const PORT = 3001

app.use(
  `/`,
  express.static(path.join(__dirname, 'dist'),)
)

app.get(`*`, (req, res) => {
  res.sendFile(__dirname + `/dist/index.html`, {
    maxAge: 0
  })
})

app.listen(PORT, () => {
  console.log(`Application is listening at http://localhost:${PORT}`)
})
