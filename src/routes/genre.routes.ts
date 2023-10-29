import { Router } from "express";
import GenreController from "../controllers/genre.controller";
import validationMiddleware from "../middleware/validation.middleware";
import genreValidation from "../validations/genre.validation";

class GenreRoutes {
  router = Router();
  controller = new GenreController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post("/", validationMiddleware(genreValidation.genre), this.controller.create);
    this.router.get("/", this.controller.findAll);
    this.router.get("/:id", this.controller.findById);
    this.router.put("/:id", validationMiddleware(genreValidation.genre), this.controller.update);
    this.router.delete("/:id", this.controller.delete);
  }
}

export default new GenreRoutes().router;