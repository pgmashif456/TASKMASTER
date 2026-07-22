 export const getStudentsController = asyncHandler(async (req, res) => {
  const students = await getStudents();

  return res.status(200).json(
    new ApiResponse(200, "Students fetched successfully", students)
  );
});