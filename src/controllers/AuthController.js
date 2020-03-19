const crypto = require('crypto');
const User = require('../controllers/UsersController');
const Token = require('../controllers/TokenController');
const jwt = require('jsonwebtoken');

function hashPassword(password) {
    const hash = crypto.createHmac(`sha256`, password)
        .digest('hex');
    return hash;
};

async function signUpUser(req, res) {    
    const { nickname, password, email } = req.body;
    let status;
    let response = {};

    if (nickname && email && password) {
        nicknameExistAlready = await User.findUserByNickname(nickname);
        emailExistAlready = await User.findUserByEmail(email);        

        if (nicknameExistAlready.length > 0) {
            status = 400;
            response.message = "Nickname já cadastrado";
        } else if (emailExistAlready.length > 0) {            
            status = 400;
            response.message = "Email já cadastrado"
        } else {
            let data = {
                nickname,
                password: hashPassword(password),
                email,
            };    
            const user = await User.createUser(data);            
            status = 201;
            response.body = user;
            response.message = "Usuário criado com sucesso";
        }
    } else {        
        status = 400;
        response.message = "Dados incompletos";
    }
    res.status(status).json(response);
};

async function signInUser(req, res) {
    const { nickname, password } = req.body;
    let user = {
        nickname,
        password: hashPassword(password),
    };
    let userInfoDB = await User.findUserByNickname(nickname)
    const { nickname: nicknameDb, password: passwordDb } =  userInfoDB.dataValues;    
    let status;
    let response = {};
    if (user.nickname === nicknameDb && user.password === passwordDb) {        
        status = 200;
        response.body = user;
        response.message = 'Autorizado';
        response.accessToken = generateAccessToken(user.nickname);
        response.refreshToken = generateRefreshToken(user.nickname);
        Token.createToken({ refresh_token: response.refreshToken });
    } else {
        status = 401;
        response.message = 'Não autorizado';
    }
    res.status(status).json(response);  
};

async function checkRefreshToken(req, res) {
    const refreshToken = req.body.token;
    if (!refreshToken) return res.sendStatus(401);
    let { refresh_token: refreshTokenDB } = await Token.findRefreshToken(refreshToken).dataValues;
    if (!refreshTokenDB) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        const accessToken = generateAccessToken({ nickname: user.nickname });
        res.status(200).json({
            accessToken
        })
    });
}

function authenticateTokenMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

function generateAccessToken(nickname) {
    return jwt.sign({
        nickname: nickname,
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20m' });
}

function generateRefreshToken(nickname) {
    return jwt.sign({
        nickname: nickname,
    }, process.env.REFRESH_TOKEN_SECRET);
}

module.exports = {
    signUpUser,
    signInUser,
    checkRefreshToken,       
};
