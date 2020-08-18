const Sequelize = require('sequelize')
const config = require('../config/sqlConfig')

const sequelize = new Sequelize(config.mysql_database,config.mysql_user,config.mysql_password,{
  host:config.mysql_host,
  port:config.mysql_port,
  dialect:'mysql'
})

module.exports = sequelize
