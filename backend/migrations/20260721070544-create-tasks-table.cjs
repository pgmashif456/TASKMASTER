 "use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Tasks", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
        allowNull: false,
        primaryKey: true,
      },

      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      status: {
        type: Sequelize.ENUM(
          "PENDING",
          "IN_PROGRESS",
          "COMPLETED"
        ),
        allowNull: false,
        defaultValue: "PENDING",
      },

      priority: {
        type: Sequelize.ENUM(
          "LOW",
          "MEDIUM",
          "HIGH"
        ),
        allowNull: false,
        defaultValue: "MEDIUM",
      },

      dueDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      assignedBy: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },

      assignedTo: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      deletedAt: {
        type: Sequelize.DATE,
      },
    });

    await queryInterface.addIndex("Tasks", ["status"]);
    await queryInterface.addIndex("Tasks", ["priority"]);
    await queryInterface.addIndex("Tasks", ["assignedTo"]);
    await queryInterface.addIndex("Tasks", ["assignedBy"]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable("Tasks");

    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_Tasks_status";'
    );

    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_Tasks_priority";'
    );
  },
};