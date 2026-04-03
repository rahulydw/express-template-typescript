import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";

const app = express();

// Core Middlewares
app.use(
  cors({
    origin(origin, callback) {
      const allowed = process.env.ORIGIN;
      if (allowed.includes(origin)) callback(null, true);
      else callback(new Error("Not allowed by CORS"));
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
