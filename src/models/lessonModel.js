const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Lesson = sequelize.define('Lesson', {
  Room: DataTypes.STRING(4),
  Title: DataTypes.STRING(255),
  Start: DataTypes.DATE,
  End: DataTypes.DATE,
}, {});

module.exports = Lesson;
