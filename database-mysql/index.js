const Sequelize = require('sequelize');


try {
  var config = require('../config.js')
}


catch(e) {
  var config = {
    HOST     : 'gatewaydb-node',
    USER    : process.env.MYSQL_USER,
    PASSWORD : process.env.MYSQL_ROOT_PASSWORD,
    DATABASE : process.env.MYSQL_DATABASE,
    PORT: 3306
  }
}


try {
  var sequelize = new Sequelize(config.DATABASE, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: 'mysql',
  });
} catch(e) {
  console.log(e)
}



const SubscribedUser = sequelize.define('subscribed_user', {
  user: Sequelize.STRING,
  email: Sequelize.STRING,
  phone: Sequelize.STRING
});


sequelize.sync()


module.exports = {
  sequelize: sequelize,
  SubscribedUser: SubscribedUser
}




