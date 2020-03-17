const crypto = require('crypto')
const {UserModel} = require(`../models/User`)
const User = new UserModel()

function registerUser(req, res) {
    let user = {
        nickname: req.body.nickname,
        password: hashPassword(req.body.password),
        email: req.body.email
    }
    User.createUser(user)
    res.json(user)
    res.sendStatus(201)
}

function signInUser(req, res) {
    let user = {
        nickname: req.body.nickname,
        password: hashPassword(req.body.password),
    }
    let user2 = User.findUserByNickname(user.nickname)
    console.log('user: ',user)
    console.log('user2: ', user2)
    let response ={
        status: null,
        body: null
    }
    if (user.nickname == user2.nickname && user.password == user2.password) {
        response.status = 200
        response.body = user
    } else {
        response.status = 401
        response.body = 'unauthorized'
    }
    res.status(response.status)
    res.send(response.body)
}

function getUser(req,res) {
    users = User.findUserById(req.params.id)
    res.json()
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