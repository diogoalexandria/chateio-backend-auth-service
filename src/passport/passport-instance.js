const passport = require('passport');
const initializePassport = require('./passport-config');
const user = require('../models/User');

initializePassport(passport,
    nickname => users.find(user => user.nickname === nickname),
    id => users.find(user => user.id === id)
);

module.exports = passport;