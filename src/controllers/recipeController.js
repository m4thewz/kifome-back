import sequelize from "../db/index.js"
import { Recipe, Ingredient, Category, RecipeIngredient, RecipeCategory } from "../db/models/index.js"
import normalizeText from "../utils/normalizeText.js"
import Joi from  "joi";

const recipeSchema = Joi.object({
  title: Joi.string().min(1).max(100).required(),
  description: Joi.string().min(1).max(500),
  preparation: Joi.string().min(1).required(),
  portionQuantity: Joi.number().integer().min(1),
  portionUnity: Joi.string().valid("serving", "slice", "unit", "cup", "bowl"),
  prepTime: Joi.number(),
  ingredients: Joi.array().items(Joi.object({
    name: Joi.string().required(),
    quantity: Joi.string().required(),
    unit: Joi.string().valid("unit", "kg", "g", "l", "ml", "cup", "tablespoon", "teaspoon", "pinch", "slice").default("unit")
  })).required(),
  categories: Joi.array().items(Joi.string().min(1))
})

async function register(req, res) {
  const { title, description, preparation, portionQuantity, portionUnity, prepTime, ingredients, categories } = req.body
  const validationResult = recipeSchema.validate({ title, description, preparation, portionQuantity, portionUnity, prepTime, ingredients, categories })

  if (validationResult.error) {
    console.error("Validation error:", validationResult.error.message)
    return res.status(400).json({ error: validationResult.error.message })
  }

  const t = await sequelize.transaction()
  try {
    const authorUsername = req.user.username

    const recipe = await Recipe.create(
      { title, description, preparation, portionQuantity, portionUnity, prepTime, authorUsername },
      { transaction: t }
    )

    for (const ing of ingredients) {
      const normalizedIngredientName = normalizeText(ing.name)
      const [ingredient] = await Ingredient.findOrCreate({
        where: { name: normalizedIngredientName },
        defaults: { name: normalizedIngredientName, displayName: ing.name },
        transaction: t
      })
      await RecipeIngredient.create(
        { recipeId: recipe.id, ingredientId: ingredient.id, quantity: ing.quantity, unit: ing.unit },
        { transaction: t }
      )
    }

    for (const cat of categories) {
      const normalizedCategoryName = normalizeText(cat)
      const [category] = await Category.findOrCreate({
        where: { name: normalizedCategoryName },
        defaults: { name: normalizedCategoryName, displayName: cat },
        transaction: t
      })
      await RecipeCategory.create(
        { recipeId: recipe.id, categoryId: category.id },
        { transaction: t }
      )
    }

    await t.commit()

    return res.status(201).json(recipe)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: "Error creating recipe" })
  }
}

async function getAll(_, res) {
  try {
    const recipes = await Recipe.findAll({
      include: [
        {
          model: Ingredient,
          as: "ingredients",
          through: { attributes: ["quantity", "unit"]},
          attributes: ["name", "displayName"]
        },
        {
          model: Category,
          as: "categories",
          attributes: ["name", "displayName"],
          through: { attributes: [] }
        }
      ]
    })
    return res.status(200).json(recipes)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: "Error listing recipes" })
  }
}

async function getById(req, res) {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findByPk(id, {
      include: [
        {
          model: Ingredient,
          as: "ingredients",
          through: { attributes: ["quantity", "unit"]},
          attributes: ["name", "displayName"]
        },
        {
          model: Category,
          as: "categories",
          attributes: ["name", "displayName"]
        }
      ]
    });

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

    if (recipe.authorUsername != req.user.username) {
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

    if (recipe.authorUsername != req.user.username) {
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
