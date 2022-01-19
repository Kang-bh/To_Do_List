const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10

const userSchema = mongoose.Schema({
    name:{
        type:String,
        maxlength: 10
    },
    email:{
        type:String,
        trim: true, // 빈 칸 없애주는 역할
        unique: 1
    },
    password: {
        type:String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    firstname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0 // 0 : 이용자 1 : 관리자
    },
    image: String,
    token: {
        type: String // 유효성 관리
    },
    tokenExp: { //token 유효기간
        type: Number
    }
})

// index.js 의 save 전에 할 일
userSchema.pre('save', function(next){
    var user = this;
    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
                // Store hash in your password DB.
                if(err) return next(err)
                user.password = hash // hash 된 비밀번호로 변경
                next()
            });
        });
    } else {
        // 다른 거 변경 시
        next()
    }
    // 비밀번호 암호화 시키기
    
})

const User = mongoose.model('User', userSchema)

module.exports = { User }