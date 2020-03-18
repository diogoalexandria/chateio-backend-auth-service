if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const routes = require('./routes');
const bodyParse = require('body-parser');
const cors = require('cors');

require('./database');

const PORT = process.env.PORT ? process.env.PORT : 3333;

app.use(cors());
app.use(bodyParse.urlencoded({
    extended: true
}));
app.use(bodyParse.json());
app.use(routes);

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
});
