var express = require('express');
var bodyParser = require('body-parser');
var request = require('request')
var mysql = require('mysql');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var db = require('../database-mysql/utils.js')

var session = require('express-session')

var app = express();
app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.set('views', __dirname + '/views');

// Creating a second new logical route (or url) that will be used when referring any file inside views dir on the server side. If not set, it will go to '/' as instructed on the express static line app.use(express.static(__dirname + '/../client/dist'));

app.use('/server', express.static( __dirname + '/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
// app.set('view engine', 'ejs');

// now we can use res.render to load up an ejs view file

/* + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +
  API Routes
 + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +*/

var hour = 3600000
var options = {
    host:  process.env.MYSQL_HOST,
    port: 3306,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    endConnectionOnClose: true,
    charset: 'utf8mb4_bin',
    createDatabaseTable: true,
    expiration: new Date(Date.now() + hour),
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
        }
    }
};

var connection = mysql.createConnection(options); // or mysql.createPool(options);
var sessionStore = new MySQLStore({}/* session store options */, connection);

app.use(session({
  key: 'eleOne-brownies',
  secret: 'keyboard cat',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {httpOnly: false}
}))



app.post('/login', login);
app.get('/logout', logout);
app.post('/saveSubscriber', saveSubscriber);
app.post('/readSubscriber', readSubscriber);
app.get('/home', home);

/* + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +
  API Route Functions
+ + + + + + + + + + + + + + + + + + + + + + + + + + + + + + */


const CLIENT_ID = '15484339292-sl85fv09m51i4q69ecfgtu392266fm4o.apps.googleusercontent.com'

function home(req, res) {
  res.render('home.html');
}


function login(req, res) {
  const token = req.body.profile.token.id_token;
  console.log('the token is', token)
  const {OAuth2Client} = require('google-auth-library');
  const client = new OAuth2Client(CLIENT_ID);

  async function verify() {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();

    return userInfo = {
      uid: payload['sub'],
      email: payload['email'],
      username: payload['email']
    }
}

  verify().then((userid) => {
     if (!req.session.userid ) {
      req.session.regenerate((err) => {
        req.session.userid = userid
        res.end('session created')
      })
     }
  })
}


function logout(req, res) {
  req.session.destroy(function(err) {
    res.end('session destroyed')
  })
}




function saveSubscriber(req, res) {
  var subscriberInfo = req.body;
  if (!subscriberInfo.sessionID)
    res.end('the post data is missing session ')
  else if (!subscriberInfo.email && !subscriberInfo.phone) {
    res.end('the post data has neither phone nor email ')
  } else if ( (subscriberInfo.email || subscriberInfo.phone) && subscriberInfo.sessionID) {
    db.getGoogleSignInEmail(subscriberInfo.sessionID, (err, googleSignInEmail) => {
      if (err) res.end(err)
      else {
        subscriberInfo.user = googleSignInEmail;
        db.saveSubscriber(subscriberInfo, (err, result) => {
          if (err) res.end(err)
          if (result) res.end(result)
        })
      }
    })
  }
}


function readSubscriber(req, res) {
  var sessionID = req.body.sessionID
  db.readSubscriber(sessionID, (result) => {
    var existingSubscription = JSON.stringify({email: result.dataValues.email, phone:result.dataValues.phone})
    if (result !== 'user_id not found in subscribers table') res.end(existingSubscription)
    if (result === 'user_id not found in subscribers table' ) res.end('not found')
  })
}










var port = process.env.PORT || 9000;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});




