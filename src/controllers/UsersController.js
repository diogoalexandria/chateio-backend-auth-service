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
}

function deleteUser(nickname) {
    User.destroy({
        where: {
            nickname
        }
    }).then(deletedUser => {
        console.log(deletedUser, "Foi excluído");
        return deletedUser;
    });    
}

module.exports = {
    createUser,    
    findUserByNickname,
    findUserByEmail,
    findUsers,
    deleteUser
}