  import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
 import {
  swaggerUi,
  swaggerSpec,
} from "./config/swagger.js";
import routes from "./routes/index.js";
import notFoundMiddleware from "./middlewares/notFound.middleware.js";
import errorMiddleware from "./middlewares/error.middleware.js";
 
const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Task Manager API is running 🚀",
  });
});

app.use("/api", routes);
 
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;