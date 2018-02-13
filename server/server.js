// DEPENDENCIES
const express = require('express');
const bodyParser = require('body-parser')

const knex = require('./db/knex.js');
const routes = require('./routes/routes');

// APP
const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => res.send('hello wjhgorld!'));

// MIDDLEWARE
app.use(bodyParser.json());

//ROUTES
app.use('/', routes);

app.listen(port, () => console.log(`Server listening on port ${port}`));