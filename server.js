const express =  require('express');
const sslRedirect = require('heroku-ssl-redirect');
const app = express();
const connection = require('./db/connection');
const path = require('path');
const bodyParser = require('body-parser');
const login = require('./routes/login');
const logout = require('./routes/logout')
const register = require('./routes/register');
const createprofile = require('./routes/createprofile');
const profile = require('./routes/profile');
const checkin = require('./routes/checkin');
const search = require('./routes/search');
const passport = require('passport');
const session = require('express-session');
const auth = require('./auth/setup');
const methodOverride = require('method-override');


const sessionConfig = {
  secret: ' ',
  key: 'user',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 30 * 60 * 1000, secure: false }
};

auth.setup();
connection.connect();

app.use(sslRedirect(['production'], 301));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
app.use(express.static('public'));
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride());


app.use('/login', login);
app.use('/logout', logout);
app.use('/register', register);
app.use('/createprofile', createprofile);
app.use('/profile', profile);
app.use('/checkin', checkin);
app.use('/search', search);


app.get('/.well-known/acme-challenge/0s60KDv-MAk1kIUFb72Y8Y9rgUU6T6QUlyiAPJMNipo',
        function (req,res){
          res.send('0s60KDv-MAk1kIUFb72Y8Y9rgUU6T6QUlyiAPJMNipo._buPIbebJ-48T-JaN-s6clt7KQNy800WS5GVrM9QtDE');
        });
// serve the index page at /
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './public/views/index.html'));
});

app.get('/authenticated', ensureAuthenticated);

app.get('/*', function(req, res){
  res.sendFile(path.join(__dirname, 'public/views/index.html'));
});


// everything beyond this point must be authenticated
app.use(ensureAuthenticated);

app.get('/profile', function(req, res){
  res.send('logged in');
});



function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.sendStatus(401);
  }
}
var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
  console.log('Listening on port ', server.address().port);
});
