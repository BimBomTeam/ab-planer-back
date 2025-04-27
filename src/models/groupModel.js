const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const Group = sequelize.define('Group', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  start_year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  group_number: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  group_name: {
    type: DataTypes.STRING(100),
    allowNull: true
  }
}, {
  tableName: 'Groups',
  timestamps: true
});

module.exports = Group;
