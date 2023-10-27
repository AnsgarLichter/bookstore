import { Application } from "express";

import homeRoutes from "./home.routes";
import booksRoutes from "./books.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/api/v1/", homeRoutes);
    app.use("/api/v1/books", booksRoutes);
  }
}