const uuidv1 = require('uuid').v1



class UserModel {
    constructor() {
        this.users = []
    }

    createUser(user) {
        user.id = uuidv1()
        this.users.push(user)
        return user
    }
    findUserById(id) {
        return this.users.find(user => user.id === id)
    }
    findUserByNickname(nickname) {
        return this.users.find(user => user.nickname === nickname)
    }

    findUsers() {
        return this.users
    }
    deleteUser(id) {
        let deletedUser = this.users.find(user => user.id = id)
        this.users.pop(deletedUser)
        return deletedUser
    }
}

module.exports = {
    UserModel
}