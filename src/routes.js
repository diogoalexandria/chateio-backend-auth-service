const { Router } = require('express');
const AuthController = require('./controllers/AuthController');

routes = Router();

routes.post('/register', AuthController.registerUser);
routes.post('/login',  AuthController.signInUser);
// routes.get(`/user/:id`, AuthController.getUser);

module.exports = routes
