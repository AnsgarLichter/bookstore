import { Router } from "express";
import AuthorController from "../controllers/author.controller";
import GenreController from "../controllers/genre.controller";

class GenreRoutes {
  router = Router();
  controller = new GenreController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    // Create a new Tutorial
    this.router.post("/", this.controller.create);

    // Retrieve all Tutorials
    this.router.get("/", this.controller.findAll);

    // Retrieve a single Tutorial with id
    this.router.get("/:id", this.controller.findById);

    // Update a Tutorial with id
    this.router.put("/:id", this.controller.update);

    // Delete a Tutorial with id
    this.router.delete("/:id", this.controller.delete);
  }
}

export default new GenreRoutes().router;