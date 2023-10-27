import express, { Application } from "express";
import cors, { CorsOptions } from "cors";

import Database from "./services/database.service";
import Routes from "./routes";

const allowedOrigins = ['/http:\/\/localhost(:\d{1,5})?/'];

export default class Server {
  constructor(app: Application, port: Number) {
    this.initialize(app, port);
  }

  private async initialize(app: Application, port: Number) {
    await this.config(app);
    new Routes(app);

    this.startServer(app, port);
  }

  private async config(app: Application): Promise<void> {
    const corsOptions: CorsOptions = {
      origin: allowedOrigins
    };

    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    await Database.connect();
  }

  private startServer(app: Application, port: Number) {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  }
}