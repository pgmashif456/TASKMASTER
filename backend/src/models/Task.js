  import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { TASK_STATUS } from "../constants/taskStatus.js";
import { TASK_PRIORITY } from "../constants/taskPriority.js";

const Task = sequelize.define(
  "Task",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Title is required",
        },
      },
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Description is required",
        },
      },
    },

    status: {
      type: DataTypes.ENUM(...Object.values(TASK_STATUS)),
      allowNull: false,
      defaultValue: TASK_STATUS.PENDING,
    },

    priority: {
      type: DataTypes.ENUM(...Object.values(TASK_PRIORITY)),
      allowNull: false,
      defaultValue: TASK_PRIORITY.MEDIUM,
    },

    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    assignedBy: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    assignedTo: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    paranoid: true,
  }
);

export default Task;