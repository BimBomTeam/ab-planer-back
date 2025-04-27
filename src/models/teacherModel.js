const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const Teacher = sequelize.define('Teacher', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  tableName: 'Teachers',
  timestamps: true
});

module.exports = Teacher;
