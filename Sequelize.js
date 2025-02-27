const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('projet_kheiri', 'root', '', {
  host: 'localhost',
  dialect: 'mysql', 
});


module.exports = sequelize;
