const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const {User} = require("./models/user")

// application/x-www-form-urlencoded 형태 데이터 분석
app.use(bodyParser.urlencoded({extended: true}));
// application/json 형식 분석
app.use(bodyParser.json());


mongoose.connect('mongodb+srv://KBH:skoo1293@todolist.h7at6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
// MongoDB PW 특수문자 X
// 6.0 이상 부터는 기본적용  
//useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))




app.get('/', (req, res) => {
  res.send('Hello World!, BYE!')
})

app.post('/register', (req, res) => {
  // 회원가입시 필요한 정보들 클라이언트에서 가져오면 DB에 넣어주는 것
  // 인스턴스 생성
  // bodyParser 이용해서 받아오는 것
  const user = new User(req.body) // req.body 안에 json 형식의 아이디  { id :, password: }
  
  user.save((err, userInfo) => {
    if(err) return res.json({ success: false, err})
    return res.status(200).json({
      success: true
    })
  }) // mongodb method user모델에 정보 저장
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
