import { Router } from "express";
import users from "../app/controllers/UsersController";

const routes = new Router();

// users
routes.get("/login", users.login);
routes.get("/users/show", users.show);
routes.post("/users/create", users.create);
routes.patch("/users/edit/:id", users.update);
routes.delete("/users/delete/:id", users.destroy);

export default routes;
