const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const LessonType = sequelize.define('LessonType', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(20),
    allowNull: false
  }
}, {
  tableName: 'LessonTypes',
  timestamps: true
});

module.exports = LessonType;
