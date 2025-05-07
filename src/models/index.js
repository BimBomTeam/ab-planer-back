const { sequelize } = require('../../config/db');
const Lesson = require('./lessonModel');
const Teacher = require('./teacherModel');
const LessonType = require('./lessonTypeModel');
const Group = require('./groupModel');
const User = require('./userModel');
const Major = require('./majorModel');

// Relacje dla Lesson
Teacher.hasMany(Lesson, { foreignKey: 'teacher_id' });
Lesson.belongsTo(Teacher, { foreignKey: 'teacher_id' });

LessonType.hasMany(Lesson, { foreignKey: 'lesson_type_id' });
Lesson.belongsTo(LessonType, { foreignKey: 'lesson_type_id' });

Group.hasMany(Lesson, { foreignKey: 'group_id' });
Lesson.belongsTo(Group, { foreignKey: 'group_id' });

// Relacje dla User
Group.hasMany(User, { foreignKey: 'group_id' });
User.belongsTo(Group, { foreignKey: 'group_id' });

// Relacje dla Major i Group
Major.hasMany(Group, { foreignKey: 'major_id' });
Group.belongsTo(Major, { foreignKey: 'major_id' });

module.exports = { sequelize, Lesson, Teacher, LessonType, Group, User, Major };
