   import ApiError from "../utils/ApiError.js";

const validationMiddleware = (
  schema,
  property = "body"
) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const message = error.details
        .map((detail) => detail.message)
        .join(", ");

      return next(new ApiError(400, message));
    }

    // Express 5 compatibility
    if (property === "query") {
      Object.assign(req.query, value);
    } else if (property === "params") {
      Object.assign(req.params, value);
    } else {
      req.body = value;
    }

    next();
  };
};

export default validationMiddleware;