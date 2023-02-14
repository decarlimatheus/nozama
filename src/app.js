import express from "express";
import cors from "cors";

// routes
import BooksRoutes from "./routes/BooksRoutes";
import UsersRoutes from "./routes/UsersRoutes";

import "./database";

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.cors();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  cors() {
    this.server.use(
      cors({ credentials: true, origin: "http://localhost:3000" })
    );
  }

  routes() {
    this.server.use("/books", BooksRoutes);
    this.server.use("/users", UsersRoutes);
  }
}

export default new App().server;
