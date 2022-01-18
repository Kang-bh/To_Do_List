const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://KBH:skoo1293@todolist.h7at6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
// MongoDB PW 특수문자 X
// 6.0 이상 부터는 기본적용  
//useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
