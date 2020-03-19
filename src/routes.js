const { Router } = require('express');
const AuthController = require('./controllers/AuthController');
const UserController = require('./controllers/UsersController');
const TokenController = require('./controllers/TokenController');

routes = Router();

routes.post('/register', AuthController.signUpUser);
routes.post('/login',  AuthController.signInUser);
routes.post('/token', AuthController.checkRefreshToken);
routes.delete('/logout', TokenController.deleteRefreshToken);
routes.delete('/unregister', UserController.deleteUser);
routes.get('/users', UserController.findUsers);

module.exports = routes
