const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const LessonType = sequelize.define('LessonType', {
  Name: DataTypes.STRING(20),
}, {});

module.exports = LessonType;
