const mongoose = require('mongoose');

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

const User = mongoose.model('User', userSchema)

module.exports = { User }