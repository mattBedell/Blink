const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');

const session = require('express-session');
const google = require('googleapis');
const gmail = google.plus('v1');
const PORT = process.env.PORT || 3001;
const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());

// ********* http://voidcanvas.com/googles-oauth-api-node-js/ **********

//configure session cookie
app.use(session({
  secret: 'secret_eorivj340g45j9g4509j9wcr',
    resave: true,
    saveUninitialized: false,
    secure: false
}));
// -----

// ----- routing

// serve landing page
app.use('/', express.static(path.join(process.env.PWD, 'public/')))

// serve production react app
app.use('/app', express.static(path.join(process.env.PWD, 'public/app.html')))
app.use('/static', express.static(path.join(process.env.PWD, 'public/static')))

// Generate link to google auth services
app.use('/utils/createLoginLink', require('./routes/utils.js'))

// handle user login and create session
app.use('/logged', require('./routes/logged.js'))

// Update database with new user and/or save session id to user in database
app.use('/home', require('./routes/home.js'))

// api route
app.use('/api', require('./routes/api.js'))
app.use('/api/checkSession', require('./routes/checkSession'))



app.listen(PORT, console.log(`SERVER IS LISTENING ON ${PORT}`));
