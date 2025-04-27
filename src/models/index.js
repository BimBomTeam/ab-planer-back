const { sequelize } = require('../../config/db');
const Lesson = require('./lessonModel');
const Teacher = require('./teacherModel');
const LessonType = require('./lessonTypeModel');
const Group = require('./groupModel');
const User = require('./userModel');
const Major = require('./majorModel');

// Relacje

// Relacje dla Lesson
Teacher.hasMany(Lesson);
Lesson.belongsTo(Teacher);

LessonType.hasMany(Lesson);
Lesson.belongsTo(LessonType);

Group.hasMany(Lesson);
Lesson.belongsTo(Group);

// Relacje dla User
Group.hasMany(User);
User.belongsTo(Group);

// Relacje dla Major i Group
Major.hasMany(Group, { foreignKey: 'major_id' });
Group.belongsTo(Major, { foreignKey: 'major_id' });

module.exports = { sequelize, Lesson, Teacher, LessonType, Group, User, Major };
