import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import userRouter from "../routes/userRouter";
import adminRouter from "../routes/adminRouter";
import session from "express-session";
import { EventEmitter } from "events";
import { app } from "../services/socketIo";
import "../services/croneJobs";
import logger from "./logger";

const createServer = async () => {
  try {
    const corsOptions = {
      origin: process.env.ORIGIN || "*",
      credentials: true,
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
      allowedHeaders:
        "Origin,X-Requested-With,Content-Type,Accept,Authorization",
      optionsSuccessStatus: 200,
    };
    app.use(express.static(path.join(__dirname, "../../../public")));
    // Apply CORS middleware
    app.use(cors(corsOptions));
    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(
      session({
        secret: "your_secret_key",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
      })
    );
    //event emitters limit
    EventEmitter.defaultMaxListeners = 20;
    //Routes

    app.use("/user", userRouter);
    app.use("/admin", adminRouter);
    //error middle ware
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      logger.error("something went wrong", err);
      console.error(err);
      res.status(500).send("Internal server error! from backend side");
    });

    return app;
  } catch (error) {
    console.log(error);
  }
};

export default createServer;
