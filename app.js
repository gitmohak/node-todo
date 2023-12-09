import bodyParser from "body-parser"
import express from "express";
import { router } from "./routes/user.js";
import {config} from "dotenv";
import cookieParser from "cookie-parser";
import taskRouter from "./routes/task.js"
import { errorMiddleware } from "./middleware/error.js";
import cors from "cors"

export const app = express();

config({
    path: "./data/config.env"
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", router);
app.use("/api/v1/task", taskRouter);
app.use(errorMiddleware);
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));