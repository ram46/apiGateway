var express = require('express');
var bodyParser = require('body-parser');
var request = require('request')
var mysql = require('mysql');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

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


// app.get('/monitor', monitor);
// app.get('/getServiceAddressesByPort', getServiceAddressesByPort);
app.post('/login', login);
app.get('/logout', logout)


/* + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +
  API Route Functions
+ + + + + + + + + + + + + + + + + + + + + + + + + + + + + + */

function monitor(req,res) {
  request('http://localhost:9001/getMicroservices', (error, response, body) => {
    if (error) res.send('Error while getting microservices')
    else res.send(body)
  })
}



function getServiceAddressesByPort(req, res) {
    request('http://localhost:9001/getMicroservices', (error, response, body) => {
    if (error) res.send('Error while getting microservices')
    if(body) {
        var grouped_by_port = _.groupBy(JSON.parse(body), 'port')
        console.log(grouped_by_port)
        res.send(grouped_by_port)
    }
  })
}


function restrict() {
}


const CLIENT_ID = '15484339292-sl85fv09m51i4q69ecfgtu392266fm4o.apps.googleusercontent.com'

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

var port = process.env.PORT || 9000;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
