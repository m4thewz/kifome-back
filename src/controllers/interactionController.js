import { Recipe, Comment, Like } from "../db/models/index.js";
import Joi from "joi";

const commentSchema = Joi.string().min(1).max(200).required();

async function registerComment(req, res) {
  const recipeId = req.params.id;
  const { content } = req.body;
  const validationResult = commentSchema.validate(content);

  if (validationResult.error) {
    console.error("Validation error: ", validationResult.error.message);
    return res.status(400).json({ error: validationResult.error.message });
  }

  const recipe = await Recipe.findByPk(recipeId);
  if (!recipe) {
    return res.status(404).json({ error: "Recipe not found" });
  }

  try {
    const comment = await Comment.create({ content, recipeId, authorId: req.user.id });
    return res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error posting comment" });
  }
}

async function updateComment(req, res) {
  const { id } = req.params
  const { content } = req.body
  const validationResult = commentSchema.validate(content)

  if (validationResult.error) {
    console.error("Validation error: ", validationResult.error.message);
    return res.status(400).json({ error: validationResult.error.message });
  }
  try {
    const comment = await Comment.findByPk(id)
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    await comment.update({ content }).then((updatedComment) => {
      return res.status(200).json(updatedComment);
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error updating comment" });
  }
}

async function removeComment(req, res) {
  const { id } = req.params;
  const comment = await Comment.findByPk(id);

  if (!comment) {
    return res.status(404).json({ error: "Comment not found" });
  }
  if (comment.authorId != req.user.id) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  try {
    await comment.destroy();
    return res.sendStatus(204);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error deleting comment" });
  }
}

async function registerLike(req, res) {
  const recipeId = req.params.id;

  const recipe = await Recipe.findByPk(recipeId);
  if (!recipe) {
    return res.status(404).json({ error: "Recipe not found" });
  }

  try {
    const [like, created] = await Like.findOrCreate({ where: { recipeId, userId: req.user.id } });
    if (!created) {
      return res.status(405).json({ error: "User already liked this recipe" });
    }
    return res.status(201).json(like);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error registering like" });
  }
}

async function removeLike(req, res) {
  const recipeId = req.params.id;
  const like = await Like.findOne({ where: { recipeId, userId: req.user.id } });

  if (!like) {
    return res.status(404).json({ error: "Like not found" });
  }

  try {
    await like.destroy();
    return res.sendStatus(204);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error deleting like" });
  }
}

export default { registerComment, updateComment, removeComment, registerLike, removeLike };
