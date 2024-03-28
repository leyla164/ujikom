const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [];
    let salt = bcrypt.genSaltSync(10);
      users.push({
        username: 'sarah',
        fullname: 'sarah',
        email: `leyla@gmail.com`,
        password: bcrypt.hashSync('sarah', salt),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    return queryInterface.bulkInsert('Users', users, {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {
      truncate: true
    });
  }
};
