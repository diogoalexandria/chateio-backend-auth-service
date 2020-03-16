const { Router } = require('express');
const AuthController = require('./controllers/AuthController');
const initializePassport = require('./passport-config');
const passport = require('passport');

users = AuthController.users;

initializePassport(passport,
    nickname => users.find(user => user.nickname === nickname),
    id => users.find(user => user.id === id)
);

routes = Router();

routes.post('/register', AuthController.registerUser);
routes.post('/login', passport.authenticate('local'),  AuthController.signInUser);

module.exports = { routes, passport };
