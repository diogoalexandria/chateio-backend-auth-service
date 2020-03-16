if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const { routes, passport } = require('./routes');
const flash = require('express-flash');
const session = require('express-session');
const bodyParse = require('body-parser');
const cors = require('cors');

const PORT = process.env.PORT;
const SECRET = process.env.SESSION_SECRET;

app.use(cors());
app.use(bodyParse.urlencoded({
    extended: true
}));
app.use(bodyParse.json());
app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(routes);

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
});
