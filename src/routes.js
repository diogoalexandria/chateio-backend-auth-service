const { Router } = require('express');
const AuthController = require('./controllers/AuthController');
const passport = require('./passport/passport-instance');

routes = Router();

routes.post('/register', AuthController.registerUser);
routes.post('/login', passport.authenticate('local'),  AuthController.signInUser);

module.exports = routes
