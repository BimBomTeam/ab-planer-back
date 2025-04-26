const Lesson = require('./lessonModel');
const Teacher = require('./teacherModel');
const LessonType = require('./lessonTypeModel');
const Group = require('./groupModel');
const User = require('./userModel');

// Relacje
Teacher.hasMany(Lesson);
Lesson.belongsTo(Teacher);

LessonType.hasMany(Lesson);
Lesson.belongsTo(LessonType);

Group.hasMany(Lesson);
Lesson.belongsTo(Group);

Group.hasMany(User);
User.belongsTo(Group);

module.exports = { sequelize, Lesson, Teacher, LessonType, Group, User };
