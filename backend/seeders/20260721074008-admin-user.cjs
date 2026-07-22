 "use strict";

const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface) {
    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    await queryInterface.bulkInsert("Users", [
      {
        id: require("crypto").randomUUID(),
        name: "Super Admin",
        email: "admin@taskmaster.com",
        password: hashedPassword,
        role: "ADMIN",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Users", {
      email: "admin@taskmaster.com",
    });
  },
};