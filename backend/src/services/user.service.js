 export const getStudents = async () => {
  return await User.findAll({
    where: {
      role: "STUDENT",
      isActive: true,
    },
    attributes: ["id", "name", "email"],
    order: [["name", "ASC"]],
  });
};