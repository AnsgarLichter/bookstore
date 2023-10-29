import express, { Application } from "express";
import cors from "cors";
import morgan from 'morgan';
import helmet from "helmet";
import compression from 'compression';

import Database from "./utils/database";
import Routes from "./routes";
import ErrorMiddleware from "./middleware/error.middleware";

const allowedOrigins = ['/http:\/\/localhost(:\d{1,5})?/'];

export default class App {
  private app: Application;
  private port: Number;

  constructor(app: Application, port: Number) {
    this.app = app;
    this.port = port;

    this.initialize();
  }

  private async initialize() {
    await this.initializeDatabaseConnection();

    this.initializeMiddleware();
    this.initializeRoutes();
    this.startServer();
  }


  private async initializeDatabaseConnection(): Promise<void> {
    await Database.connect();
  }

  private initializeRoutes() {
    new Routes(this.app);
  }

  private initializeMiddleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use(cors({
      origin: allowedOrigins
    }));
    this.app.use(helmet());
    this.app.use(morgan('dev'));
    this.app.use(compression());
    
    this.app.use(ErrorMiddleware);
  }

  private startServer() {
    this.app.listen(this.port, () => {
      console.log(`Server running at http://localhost:${this.port}`);
    });
  }
}