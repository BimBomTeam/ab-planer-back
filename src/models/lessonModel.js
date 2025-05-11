const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const Lesson = sequelize.define('Lesson', {
  room: {
    type: DataTypes.STRING(4),
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  start: {
    type: DataTypes.DATE,
    allowNull: false
  },
  end: {
    type: DataTypes.DATE,
    allowNull: false
  },
  frequency: {
    type: DataTypes.ENUM('weekly', 'bi-weekly'),
    allowNull: false,
    defaultValue: 'weekly'
  },
  term: {
    type: DataTypes.ENUM('winter', 'summer'),
    allowNull: false
  },
  teacher_id: {
    type: DataTypes.INTEGER
  },
  lesson_type_id: {
    type: DataTypes.INTEGER
  },
  group_id: {
    type: DataTypes.INTEGER
  }
}, {
  timestamps: true
});

module.exports = Lesson;