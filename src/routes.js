const { Router } = require('express');
const AuthController = require('./controllers/AuthController');
// const initializePassport = require('./passport-config');
// const passport = require('passport');

// users = AuthController.users;

// initializePassport(passport,
//     nickname => users.find(user => user.nickname === nickname),
//     id => users.find(user => user.id === id)
// );

routes = Router();

routes.post('/register', AuthController.registerUser);
routes.post('/login',  AuthController.signInUser);
routes.get(`/user/:id`, AuthController.getUser)

module.exports = { 
    routes, 
    // passport 
};
