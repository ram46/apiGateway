const subscribers = require('./index.js').Subscriber;
const sequelize = require('./index.js').sequelize;


var _getSessionObj = function(sessionID, cb) {
  sequelize.query('SELECT * FROM sessions where session_id = ? LIMIT 1',
    { replacements: [sessionID], type: sequelize.QueryTypes.SELECT }).then(session => {
    if (!session[0]) cb('no session found for this sessionId', null)
    else cb(null, session[0])
  })
}

module.exports = {

  getGoogleSignInEmail: function(sessionID, cb) {
     _getSessionObj(sessionID, (err, res) => {
      if (err) cb('no session found to be parsed', null)
      if (res) {
        var data = JSON.parse(res.data)
        cb(null, data.userid.email)
      }
    })
  },



  saveSubscriber: function(subscriber, cb) {

    console.log('^^^^^^^^^^^^^^^^^ saveSubscriber. util ^^^^^^^^^^^^^')

      if (subscriber && subscriber.user) {
        subscribers.findOrCreate({where: {
          user: subscriber.user,
          email: subscriber.email,
          phone: subscriber.phone,
        }})
        cb(null, 'saved subscriber to db');
      } else {
        cb('could not save subscriber to db', null);
      }
  },



  readSubscriber: function(sessionID, cb) {
    module.exports.getGoogleSignInEmail(sessionID, (err, userid_email) => {

      subscribers.find({where: {user: userid_email}}).then((resp) => {
        console.log('*********PROBLEM*****')
        console.log(resp)
        if (resp) cb('user_id found in subscribers table')
        else if (!resp) cb('user_id not found in subscribers table')
      })
    })
  }

}









