module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('LessonTypes', [
      { name: 'Ćwiczenia', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Laboratorium', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Wykład', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('LessonTypes', null, {});
  }
};