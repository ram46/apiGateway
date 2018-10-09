const db = require('./index.js');


module.exports = {
  create: function(userName, email=null, phone=null, cb) {
    db.SubscribedUser.create({
      user: userName,
      email: email,
      phone: phone
    })
  },


  read: function(userName, cb) {
    db.SubscribedUser.find({where: {user: userName}}).then((result) => {
      if (result) cb(null, result)
      else cb('user not found', null)
    })
  },

}
