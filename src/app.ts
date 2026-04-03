import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";

const app = express();
const allowedOrigins = process.env.ORIGIN?.split(",") || [];
// Core Middlewares
app.use(
  cors({
    origin(origin, callback) {
      // allow no-origin (Postman etc)
      if (!origin) return callback(null, true);

      // allow all if "*"
      if (allowedOrigins.includes("*")) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
  }),
);
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Test Route
app.get("/", (req, res) => {
  res.send("API Running ...");
});

export default app;
