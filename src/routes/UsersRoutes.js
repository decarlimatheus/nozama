import { Router } from "express";
import users from "../app/controllers/UsersController";
import auth from "../middlewares/auth";

const routes = new Router();

routes.get("/login", users.login);

// control access from that point
routes.use(auth);

// users
routes.get("/show", users.show);
routes.post("/create", users.create);
routes.patch("/edit/:id", users.update);
routes.delete("/delete/:id", users.destroy);

export default routes;
