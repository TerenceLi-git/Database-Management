const express = require('express');
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.json())

require('./routes/user')(app);
require('./routes/testcollectionroute')(app);
require('./routes/poolmappingroute')(app);
require('./routes/welltestingroute')(app);

module.exports = app;
