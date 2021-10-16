const path = require('path')
const express = require('express')
const app = express()

const PORT = 3000

app.use(
  `/lib-app`,
  express.static(path.join(__dirname, 'dist'))
)

app.listen(PORT, () => {
  console.log(`Application is listening at http://localhost:${PORT}`)
})
