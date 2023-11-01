import { Router } from "express";
import BookController from "../controllers/book.controller";
import validationMiddleware from "../middleware/validation.middleware";
import bookValidation from "../validations/book.validation";

class BookRoutes {
  router = Router();
  controller = new BookController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post("/", validationMiddleware(bookValidation.create), this.controller.create.bind(this.controller));

    this.router.get("/", this.controller.query.bind(this.controller));
    this.router.get("/:id", this.controller.findById.bind(this.controller));
    this.router.get("/:id/author", this.controller.findByIdAndReturnAuthor.bind(this.controller));

    this.router.put("/:id", validationMiddleware(bookValidation.update), this.controller.update.bind(this.controller));
    
    this.router.delete("/:id", this.controller.delete.bind(this.controller));
  }
}

export default new BookRoutes().router;