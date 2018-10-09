const db = require('./index.js');


module.exports = {
  add: function(subscriber, cb) {
    db.Subscriber.create({
      user: subscriber.uname,
      email: subscriber.email,
      phone: subscriber.phone,
    })
  },


  read: function(userName, cb) {
    db.Subscriber.find({where: {user: userName}}).then((result) => {
      if (result) cb(null, result)
      else cb('user not found', null)
    })
  },

  delete: function(userName, cb) {
    db.Subscriber.destroy({where: {user: userName}}).then((resp) => {
      if (resp) cb(null, resp)
      else cb('err while deletion', null)
    })
  },

  updateEmail: function(newEmail, userName, cb) {
    db.Subscriber.update({ email: newEmail }, {where: {user: userName}}).then((resp) => { if (resp) cb(null, resp)
        else ('err in updating email', null)

    })
  },

  updatePhone: function(newPhone, userName, cb) {
    db.Subscriber.update({ phone: newPhone }, {where: {user: userName}}).then(() => {
        if (resp) cb(null, resp)
        else ('err in updating phone', null)
    })
  }
}




subscriber = {
  uname: 'me',
  email: 'me@yahoo.com',
  phone: '13442221223'
}

subscriber_two = {
  uname: 'you',
  email:  null,
  phone: '18002221223'
}

subscriber_three = {
  uname: 'ena',
  email: 'del@yahoo.com',
  phone: '13442221223'
}

module.exports.add(subscriber, (err, resp) => {
  console.log(resp)
})

module.exports.add(subscriber_two, (err, resp) => {
  console.log(resp)
})

module.exports.updateEmail('def@eee.com', 'me', (err, resp) => console.log(err, resp))
module.exports.updatePhone('2212212121', 'you',  (err, resp) => console.log(err, resp))
module.exports.delete('ena',  (err, resp) => console.log(err, resp))


