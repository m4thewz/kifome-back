import Recipe from "../db/models/recipe.js";
import User from "../db/models/user.js";
import Joi from  "joi";

const recipeSchema = Joi.object({
  title: Joi.string().max(100).required(),
  description: Joi.string().max(500),
  preparation: Joi.string().required(),
  portions: Joi.number().integer(),
  prepTime: Joi.number(),
})

async function register(req, res) {
  const { title, description, preparation, portions, prepTime } = req.body
  const body = { title, description, preparation, portions, prepTime }
  const validationResult = recipeSchema.validate(body)

  if (validationResult.error) {
    console.error("Validation error:", validationResult.error.message)
    return res.status(400).json({ error: validationResult.error.message })
  }

  try {
    const author = await User.findByPk(req.userID, { attributes: ["username"] })
    body["authorUsername"] = author.username

    const recipe = await Recipe.create(body)
    return res.status(201).json(recipe)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: "Error creating recipe" })
  }
}

async function getAll(_, res) {
  try {
    const recipes = await Recipe.findAll()
    return res.status(200).json(recipes)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: "Error listing recipes" })
  }
}

async function getById(req, res) {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findByPk(id);

    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    return res.json(recipe);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error finding recipe" });
  }
};

async function update(req, res) {
  const { id } = req.params;
  const { title, description, preparation, portions, prepTime } = req.body
  const body = { title, description, preparation, portions, prepTime }
  const validationResult = recipeSchema.validate(body)

  if (validationResult.error) {
    console.error("Validation error: ", validationResult.error.message)
    return res.status(400).json({ error: validationResult.error.message })
  }
  try {
    const recipe = await Recipe.findByPk(id);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    const loggedUser = await User.findByPk(req.userID, { attributes: ["username"] })
    if (recipe.authorUsername != loggedUser.username) {
      return res.status(403).json({ error: "Unauthorized" })
    }

    await recipe.update(body);
    return res.json(recipe);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error updating recipe" });
  }

}

async function remove(req, res) {
  try {
    const { id } = req.params
    const recipe = await Recipe.findByPk(id)
    if (!recipe) return res.status(404).json({ error: "Recipe not found" })

    const loggedUser = await User.findByPk(req.userID, { attributes: ["username"] })
    if (recipe.authorUsername != loggedUser.username) {
      return res.status(403).json({ error: "Unauthorized" })
    }

    recipe.destroy()
    return res.sendStatus(204)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: "Error deleting recipe" })
  }
}

export default { register, getAll, getById, update, remove }
