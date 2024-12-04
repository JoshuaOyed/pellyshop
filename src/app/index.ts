import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db";
import dotenv from "dotenv";

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());

app.use(express.json());

app.use(morgan("dev"));
dotenv.config();

connectDB();

app.get("/", (req: Request, res: Response) => {
  res.send("API is running smoothly...");
});

app.listen(PORT, () => {
  console.log(`server is running on ${process.env.NODE_ENV} mode on ${PORT}`);
});
