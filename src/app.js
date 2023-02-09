import express from "express";

// routes
import BooksRoutes from "./routes/BooksRoutes";
import UsersRoutes from "./routes/UsersRoutes";

import "./database";

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(BooksRoutes);
    this.server.use(UsersRoutes);
  }
}

export default new App().server;
