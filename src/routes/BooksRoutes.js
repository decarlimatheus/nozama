import { Router } from "express";

import books from "../app/controllers/BooksController";

const routes = new Router();

// books
routes.get("/index", books.index);
routes.get("/:id", books.getById);
routes.post("/create", books.create);
routes.patch("/edit/:id", books.update);
routes.delete("/delete/:id", books.destroy);

export default routes;
