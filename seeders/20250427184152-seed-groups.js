module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Groups', [
      { start_year: '2022/23', group_number: 1, group_name: 'TIIGK', createdAt: new Date(), updatedAt: new Date() },
      { start_year: '2022/23', group_number: 2, group_name: 'PITM', createdAt: new Date(), updatedAt: new Date() },
      { start_year: '2022/23', group_number: 3, group_name: 'PITM2', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Groups', null, {});
  }
};