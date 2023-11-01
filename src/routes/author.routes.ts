import { Router } from "express";
import AuthorController from "../controllers/author.controller";
import validationMiddleware from "../middleware/validation.middleware";
import authorValidation from "../validations/author.validation";

class AuthorRoutes {
  router = Router();
  controller = new AuthorController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post("/", validationMiddleware(authorValidation.author), this.controller.create.bind(this.controller));
    this.router.get("/", this.controller.findAll.bind(this.controller));
    this.router.get("/:id", this.controller.findById.bind(this.controller));
    this.router.put("/:id", validationMiddleware(authorValidation.author), this.controller.update.bind(this.controller));
    this.router.delete("/:id", this.controller.delete.bind(this.controller));
  }
}

export default new AuthorRoutes().router;