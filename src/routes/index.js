import { Router } from "express";
const router = Router();
import userController from "../controllers/userController.js"

router
  .get("/", (_, res) => {
    res.send("API")
  })
  .post("/users/register", userController.register)
  .get("/users", userController.getAll)
  .get("/users/:id", userController.getById)
  .put("/users/:id", userController.update)
  .delete("/users/:id", userController.remove)

export default router;
