const express = require('express')
const app = express()
const port = 3001//3000(리액트port이므로) -> 3001

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})