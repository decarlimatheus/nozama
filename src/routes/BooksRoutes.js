import { Router } from "express";

import books from "../app/controllers/BooksController";

const routes = new Router();

// books
routes.get("/index", books.index);
routes.get("/books/:id", books.getById);
routes.post("/books/create", books.create);
routes.patch("/books/edit/:id", books.update);
routes.delete("/books/delete/:id", books.destroy);

export default routes;
