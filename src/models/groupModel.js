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
  },
  major_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Majors',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}, {
  tableName: 'Groups',
  timestamps: true
});

module.exports = Group;
