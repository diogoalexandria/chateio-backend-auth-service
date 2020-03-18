const crypto = require('crypto');
const User = require('../controllers/UsersController');

function hashPassword(password) {
    const hash = crypto.createHmac(`sha256`, password)
        .digest('hex')
    return hash
};

async function registerUser(req, res) {    
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
}

async function signInUser(req, res) {
    const { nickname, password } = req.body;
    let user = {
        nickname,
        password: hashPassword(password),
    };
    let userInfoDB = await User.findUserByNickname(nickname)
    const { nickname: nicknameDb, password: passwordDb } =  userInfoDB.dataValues
    console.log('user: ', user);
    // console.log('userDb: ', userInfoDB.dataValues);
    console.log('NicknameDb: ', nicknameDb);
    console.log('PasswordDb: ', passwordDb);
    let status;
    let response = {};
if (user.nickname === nicknameDb && user.password === passwordDb) {
        status = 200;
        response.body = user;
        response.message = 'Autorizado'
    } else {
        status = 401;
        response.message = 'Não autorizado';
    }
    res.status(status).json(response);  
}

module.exports = {
    registerUser,
    signInUser
};
