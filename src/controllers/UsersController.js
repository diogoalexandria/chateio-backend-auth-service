const User = require('../models/User');

async function createUser(data) {
    const user = await User.create(data);
    return user;
};

async function findUserByNickname(nickname) {
    const user = await User.findOne({
        where: {
            nickname
        }
    });
    return user;
};

async function findUserByEmail(email){
    const user = await User.findOne({
        where: {
            email
        }
    });
    return user;
};

async function findUsers() {
    users = await User.findAll();
    return users;
};

function deleteUser(req, res) {
    nickname = req.body.nickname
    User.destroy({
        where: {
            nickname
        }
    }).then(deletedUser => {
        res.status(200).json({
            message: `${deletedUser} foi excluído`
        })
    }).catch(err => {
        res.json({
            message: err
        })
    });    
};

module.exports = {
    createUser,    
    findUserByNickname,
    findUserByEmail,
    findUsers,
    deleteUser
};