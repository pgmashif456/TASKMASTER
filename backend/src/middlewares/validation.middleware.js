//   const validationMiddleware = (req, res, next) => {
//   next();
// };

// export default validationMiddleware;

import ApiError from "../utils/ApiError.js";

const validationMiddleware = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map((err) => err.message);

      return next(new ApiError(400, errors.join(", ")));
    }

    next();
  };
};

export default validationMiddleware;