import { Application } from "express";

import homeRoutes from "./home.routes";
import bookRoutes from "./book.routes";
import authorRoutes from "./author.routes";
import genreRoutes from "./genre.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/api/v1/", homeRoutes);
    app.use("/api/v1/books", bookRoutes);
    app.use("/api/v1/authors", authorRoutes);
    app.use("/api/v1/genres", genreRoutes);
  }
}