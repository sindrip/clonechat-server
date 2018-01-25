require('./config/config');

// DEPENDENCIES
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const knex = require('./db/knex.js');
const routes = require('./routes/routes');

// APP
const app = express();
const port = process.env.PORT;

// MIDDLEWARE
app.use(bodyParser.json());
if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}    

//ROUTES
app.use('/', routes);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});