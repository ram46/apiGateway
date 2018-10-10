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


/* + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +
  API Routes
 + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +*/

var hour = 3600000
var options = {
    host: 'gatewaydb',
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
  saveUninitialized: false
}))



app.post('/login', login);
app.get('/logout', logout);
app.post('/addToDB', addToDB);
app.post('/deleteFrmDB', deleteFrmDB);
app.post('/updateEmail', updateEmail);
app.post('/updatePhone', updatePhone);
app.post('/deleteFrmDB', deleteFrmDB);
app.post('/saveSubscriber', saveSubscriber);
/* + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +
  API Route Functions
+ + + + + + + + + + + + + + + + + + + + + + + + + + + + + + */


const CLIENT_ID = '15484339292-sl85fv09m51i4q69ecfgtu392266fm4o.apps.googleusercontent.com'


function saveSubscriber(req, res) {


  console.log('^^^^^^^^^^^^^^^^^ Inside saveSubscriber ^^^^^^^^^^^^^')

  var subscriberInfo = JSON.parse(req.body)
  db.getGoogleSignInEmail(subscriber.sessionID, (err, googleSignInEmail) => {

      console.log('^^^^^^^^^^^^^^^^^ getGoogleSignInEmail. server ^^^^^^^^^^^^^')

    subscriberInfo.googleemail = googleSignInEmail;
    db.saveSubscriber(subscriberInfo, (err, result) => {

            console.log('^^^^^^^^^^^^^^^^^ saveSubscriber. server ^^^^^^^^^^^^^')

      console.log(result);
    });
  })


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


function addToDB(req, res) {
  console.log(req.body.subscriber)
  db.add(req.body.subscriber, (err, resp) => {
    var response = resp ? 'added to app db' : 'unable to add to db'
    res.send(response)
  })
}



function updateEmail(req, res) {
  console.log(req.body.subscriber)
  db.updateEmail(req.body.subscriber, (err, resp) => {
    var response = resp ? 'updated Email' : 'unable to add to db'
    res.send(response)
  })
}

function updatePhone(req, res) {
  console.log(req.body.subscriber)
  db.updatePhone(req.body.subscriber, (err, resp) => {
    var response = resp ? 'updated Phone ' : 'unable to add to db'
    res.send(response)
  })
}


function deleteFrmDB(req, res) {
  console.log(req.body.subscriber)
  db.delete(req.body.subscriber, (err, res) => {
    var response = resp ? 'deleted from app db' : 'unable to add to db'
    res.send(response)
  })
}

var port = process.env.PORT || 9000;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
