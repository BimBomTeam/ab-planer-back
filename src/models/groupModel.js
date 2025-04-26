const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Group = sequelize.define('Group', {
  StartYear: DataTypes.INTEGER,
  GroupNumber: DataTypes.INTEGER,
  GroupName: DataTypes.STRING(100),
}, {});

module.exports = Group;
