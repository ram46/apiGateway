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



const Subscriber = sequelize.define('subscriber', {
  user: {type: Sequelize.STRING, allowNull: false, unique: true},
  email: Sequelize.STRING,
  phone: {type:Sequelize.STRING, validate:{is: ["^[0-9]+$",'i']}}
});

const UserSession = sequelize.query('select * from sessions');


sequelize.sync()


module.exports = {
  sequelize: sequelize,
  Subscriber: Subscriber,
  UserSession: UserSession
}




