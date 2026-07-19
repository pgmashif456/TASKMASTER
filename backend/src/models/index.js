 import User from "./User.js";
import Task from "./Task.js";

// =========================
// User ↔ Task Relationships
// =========================

// Admin → Assigned Tasks
User.hasMany(Task, {
  foreignKey: "assignedBy",
  as: "assignedTasks",
});

// Student → Received Tasks
User.hasMany(Task, {
  foreignKey: "assignedTo",
  as: "receivedTasks",
});

// Task → Admin
Task.belongsTo(User, {
  foreignKey: "assignedBy",
  as: "assignedByUser",
});

// Task → Student
Task.belongsTo(User, {
  foreignKey: "assignedTo",
  as: "assignedToUser",
});

export { User, Task };