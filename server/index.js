const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const { auth } = require('./middleware/auth')

const config = require('./server/config/key');

const {User} = require("./models/user");

// application/x-www-form-urlencoded 형태 데이터 분석
app.use(bodyParser.urlencoded({extended: true}));
// application/json 형식 분석
app.use(bodyParser.json());
app.use(cookieParser());


mongoose.connect(config.mongoURI)
// MongoDB PW 특수문자 X
// 6.0 이상 부터는 기본적용  
//useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))




app.get('/', (req, res) => {
  res.send('Hello World!, BYE!')
})

app.post('/api/users/register', (req, res) => {
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

app.post('/api/users/login', (req, res)=>{
  // 요청된 email or 정보 데이터베이스에 있는지 FIND
  User.findOne({ email: req.body.email }, (err, user)=> {
    if(!user){
      return res.json({
        loginSucess: 'false',
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }
    // 비밀번호 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
       return res.json({ loginSucess:false, message: "비밀번호가 틀렸습니다."})
    
      // TOKEN 생성 
      user.generateToken((err, user) => {
        if(err) return res.status(400).send(err);
      
        // 토큰 저장 세션? 쿠키? 로컬? 어디에 저장할지 논의!! 중요. 장단점찾아서
        res.cookie("x_auth", user.token)
          .status(200)
          .json({ loginSucess: true, userId: user._id })

      })
    })
  })
  
})


// role 1 Admin       role 2 특정 부서 Admin
// role 0 -> 일반 유저  role 0 아니면 관리자

// auth 미들웨어 추가
app.get('/api/users/auth', auth, (req, res) => {

  // 미들웨어 통과했다는 의미
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})

app.get('/api/users/logout', auth, (req, res) => {
   User.findOneAndUpdate({_id: req.user._id}, {token: ""}, (err, user)=>{
     if (err) return res.json({success:false, err});
     return res.status(200).send({
       success:true
     })
   })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
