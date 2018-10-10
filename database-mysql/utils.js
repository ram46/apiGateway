const subscribers = require('./index.js').Subscriber;
const sessions = require('./index.js').UserSession;


console.log('************* lets see the sessions **********', sessions)

module.exports = {

  getGoogleSignInEmail: function(sessionID, cb) {
    console.log('^^^^^^^^^^^^^^^^^ getGoogleSignInEmail. util ^^^^^^^^^^^^^')

    sessions.then( (sessionList) => {
      if (sessionList.length > 0) {
        sessionList.forEach((sessions) => {
          sessions.forEach( (session) => {
            if (session && session.session_id === sessionID) {
              var data = JSON.parse(session.data);
              cb(null, data.userid.email)
            } else {
              cb('session not found', null);
            }
          })
        })
      } else {
        cb('session not found', null);
      }
    })
  },

  saveSubscriber: function(subscriber, cb) {

  console.log('^^^^^^^^^^^^^^^^^ saveSubscriber. util ^^^^^^^^^^^^^')

    if (subscriber && subscriber.googleemail) {
      subscribers.create({
        user: subscriber.googleemail,
        email: subscriber.email,
        phone: subscriber.phone,
      })
    }

  },


  readSubscriber: function(userName, cb) {
    subscribers.find({where: {user: userName}}).then((result) => {
      if (result) cb(null, result)
      else cb('user not found', null)
    })
  },

  deleteSubscriber: function(userName, cb) {
    subscribers.destroy({where: {user: userName}}).then((resp) => {
      if (resp) cb(null, resp)
      else cb('err while deletion', null)
    })
  },

  updateSubscriberEmail: function(newEmail, userName, cb) {
    subscribers.update({ email: newEmail }, {where: {user: userName}}).then((resp) => { if (resp) cb(null, resp)
        else ('err in updating email', null)

    })
  },

  updateSubscriberPhone: function(newPhone, userName, cb) {
    subscribers.update({ phone: newPhone }, {where: {user: userName}}).then((resp) => {
        if (resp) cb(null, resp)
        else ('err in updating phone', null)
    })
  }
}




// subscriber = {
//   uname: 'me',
//   email: 'me@yahoo.com',
//   phone: '13442221223'
// }

// subscriber_two = {
//   uname: 'you',
//   email:  null,
//   phone: '18002221223'
// }

// subscriber_three = {
//   uname: 'ena',
//   email: 'del@yahoo.com',
//   phone: '13442221223'
// }

// module.exports.add(subscriber, (err, resp) => {
//   console.log(resp)
// })

// module.exports.add(subscriber_two, (err, resp) => {
//   console.log(resp)
// })

// module.exports.updateEmail('def@eee.com', 'me', (err, resp) => console.log(err, resp))
// module.exports.updatePhone('2212212121', 'you',  (err, resp) => console.log(err, resp))
// module.exports.delete('ena',  (err, resp) => console.log(err, resp))


