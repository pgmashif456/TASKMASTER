 router.get(
  "/students",
  authenticate,
  authorize("ADMIN"),
  getStudentsController
);