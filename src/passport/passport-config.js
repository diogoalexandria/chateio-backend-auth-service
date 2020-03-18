const LocalStrategy = require('passport-local').Strategy;

function initialize(passport, getUserByNickname, getUserById) {
    const authenticateUser = async (nickname, password, done) => {
        const user = getUserByNickname(nickname)
        if (user == null) {
        return done(null, false, { message: 'No user with that email' })
        }

        try {
        if (password === user.password) {
            return done(null, user)
        } else {
            return done(null, false, { message: 'Password incorrect' })
        }
        } catch (e) {
        return done(e)
        }
    }
    passport.use(new LocalStrategy({ usernameField: 'nickname', passwordField: 'password' }, authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => {
      return done(null, getUserById(id))
    });

}

module.exports = initialize