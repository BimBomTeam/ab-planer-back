const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Teacher = sequelize.define('Teacher', {
  Fullname: DataTypes.STRING(255),
}, {});

module.exports = Teacher;
