import express, { Application } from "express";
import Server from "./src/index";

const app: Application = express();
const port: Number = Number.parseInt(process.env.PORT || "") | 3000;

new Server(app, port);