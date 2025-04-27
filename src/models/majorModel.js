const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const Major = sequelize.define('Major', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  tableName: 'Majors',
  timestamps: true
});

module.exports = Major;
