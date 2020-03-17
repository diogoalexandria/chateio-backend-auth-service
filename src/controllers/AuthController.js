const crypto = require('crypto')
const {User} = require(`../models/User`)
const UserModel = new User()

function registerUser(req, res) {
    let user = {
        nickname: req.body.nickname,
        password: hashPassword(req.body.password),
        email: req.body.email
    }
    UserModel.createUser(user)
    res.json(user)
    res.sendStatus(201)
}

function signInUser(req, res) {
    let user = {
        nickname: req.body.nickname,
        password: hashPassword(req.body.password),
    }
    res.status(200);
    res.json(user);
}

function getUser(req,res) {
    res.json(UserModel.findUserById(req.params.id))
}

function hashPassword(password) {
    const hash = crypto.createHmac(`sha256`, password)
    .digest('hex')
    return hash
}

module.exports = {
    registerUser,
    signInUser,
    getUser
};