const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10
const jwt = require('jsonwebtoken');
const e = require('express');

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
// method 생성
userSchema.methods.comparePassword = function(plainPassword, cb) {

    //plainPassword 1234567   암호화->  DB의 암호화된 비밀번호 같은지 Check
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err);
            cb(null, isMatch);
    })

}

userSchema.methods.generateToken = function(cb) {
    // jsonwebtoken 이용해서 token 생성
    
    let user = this

    let token = jwt.sign(user._id.toHexString(), 'secretToken') // 아무거나

    // this._id + 'secretToken' =  token -> 'secretToken'-> this._id 알 수 있다.

    user.token = token
    user.save(function(err, user) {
        if (err) return cb(err);
        cb(null, user);
    })

}

userSchema.statics.findByToken = function(token, cb) {
    var user = this;

    // 토큰을 Decode
    jwt.verify(token, 'secretToken', function(err, decoded){
        // 유저 ID 이용해서 유저를 찾은 다음
        // 클라이언트에서 가져온 token과 DB에 보관된 토큰 일치하는지 확인
        user.findOne({"_id" : decoded, "token": token}, function(err, user) {
            if(err) return cb(err);
            cb(null, user)
        }) // 몽고디비 존재하는 method
    })
}

const User = mongoose.model('User', userSchema)

module.exports = { User }