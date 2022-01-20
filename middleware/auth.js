const { User } = require('../models/user')

let auth = (req, res, next) => {
    // 인증 처리 하는 곳

    // 클라이언트 쿠키에서 토큰 가져오기    
    let token = req.cookies.x_auth;

    // 토큰을 복호화한 후 유저를 찾는다,.
    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user) return res.json({isAuth: false, error: true})

        req.token = token;
        req.user = user;
        next(); // 미들웨어에서 넘어갈 수 있기 위해
        // next 없으면 미들웨어에 갇혀있는다.
    })

    // 유저가 있으면  인증 OKAY

    // 유저가 있으면  인증 X
}

module.exports = {auth};