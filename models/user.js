const Sequelize = require('sequelize')
const sequelize = require('../utils/better-sql')
const Model = Sequelize.Model
class User extends Model { }
const moment = require('moment')

User.init({
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  avatar: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'http://pic.blueflyming.cn/image/e79fd43f8794a4c2d8a3374d19f41bd5ac6e39ef.jpg\n'
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  phoneNumber: {
    type: Sequelize.STRING,
    allowNull: true
  },
  address: {
    type: Sequelize.STRING,
    allowNull: true
  },
  roles: {
    type: Sequelize.STRING,
    defaultValue: 'user'
  },
  createdAt: {
    type: Sequelize.DATE,
    get() {
      return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD');
    }
  },
  updatedAt: {
    type: Sequelize.DATE,
    get() {
      return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD');
    }
  }
}, {
  sequelize,
  modelName: 'user'
})

// User.sync({force:true})

module.exports = User
