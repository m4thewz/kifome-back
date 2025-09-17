import { Router } from "express";
const router = Router();
import userController from "../controllers/userController.js"
import recipeController from "../controllers/recipeController.js"
import { authenticateToken } from "../middlewares/authentication.js"

router
  .get("/", (_, res) => {
    res.send("API")
  })
  .post("/users/register", userController.register)
  .post("/users/login", userController.login)
  .get("/users", userController.getAll)
  .get("/users/:id", userController.getById)
  .put("/users/:id", userController.update)
  .delete("/users/:id", userController.remove)
  .post("/recipes/register", authenticateToken, recipeController.register)
  .get("/recipes", recipeController.getAll)
  .get("/recipes/:id", recipeController.getById)
  .put("/recipes/:id", authenticateToken, recipeController.update)
  .delete("/recipes/:id", authenticateToken, recipeController.remove)

export default router;
