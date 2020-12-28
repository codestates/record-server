const express = require('express')
const app = express()
const port = 4000//3000(리액트port이므로) -> 4000

// require('dotenv').config();
// console.log('---->>>>>>>>',process.env);//!

app.use(express.static('public'));
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})