module.exports = {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert('configs', [{
            is_comain_register: false,
            plan_Reading_prompt: '',
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    down: async (queryInterface) => {
        await queryInterface.bulkDelete('configs', null, {});
    }
};  