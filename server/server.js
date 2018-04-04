// DEPENDENCIES
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const knex = require('./db/knex.js');
const routes = require('./routes/routes');

// APP
const app = express();
const port = process.env.PORT;

// SESSION
const store = new KnexSessionStore({ knex });
const session_config = {
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 * 5}, // 5 years maxage
    store,
}

// MIDDLEWARE
app.use(bodyParser.json());

// Something something https
if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    session_config.cookie.secure = true // serve secure cookies
}
app.use(session(session_config));

//ROUTES
app.use('/', routes);

app.listen(port, () => console.log(`Server listening on port ${port}`));