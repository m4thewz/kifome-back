import { Comment, User, Recipe } from '../models/index.js';
import asyncHandler from '../utils/asyncHandler.js';

const create = asyncHandler(async (req, res) => {
  const { id: recipeId } = req.params;
  const { content } = req.body;
  const userId = req.user.id;

  const recipe = await Recipe.findByPk(recipeId);
  if (!recipe) {
    return res.status(404).json({
      success: false,
      error: { message: 'Recipe not found' }
    });
  }

  const comment = await Comment.create({
    content,
    userId,
    recipeId
  });

  const commentWithAuthor = await Comment.findByPk(comment.id, {
    include: [
      {
        model: User,
        as: 'author',
        attributes: ['id', 'name', 'username', 'avatar']
      }
    ]
  });

  res.status(201).json({
    success: true,
    message: 'Created comment successfully',
    data: commentWithAuthor
  });
});

const getRecipeComments = asyncHandler(async (req, res) => {
  const { id: recipeId } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const offset = (page - 1) * limit;

  const recipe = await Recipe.findByPk(recipeId);
  if (!recipe) {
    return res.status(404).json({
      success: false,
      error: { message: 'Recipe not found' }
    });
  }

  const { count, rows: comments } = await Comment.findAndCountAll({
    where: { recipeId },
    limit,
    offset,
    order: [['createdAt', 'DESC']],
    include: [
      {
        model: User,
        as: 'author',
        attributes: ['id', 'name', 'username', 'avatar']
      }
    ]
  });

  res.json({
    success: true,
    data: {
      comments,
      pagination: {
        page,
        limit,
        total: count,
        pages: Math.ceil(count / limit)
      }
    }
  });
});

const getById = asyncHandler(async (req, res) => {
  const comment = await Comment.findByPk(req.params.id, {
    include: [
      {
        model: User,
        as: 'author',
        attributes: ['id', 'name', 'username', 'avatar']
      },
      {
        model: Recipe,
        attributes: ['id', 'title']
      }
    ]
  });

  if (!comment) {
    return res.status(404).json({
      success: false,
      error: { message: 'Comment not found' }
    });
  }

  res.json({
    success: true,
    data: comment
  });
});

const update = asyncHandler(async (req, res) => {
  const { content } = req.body;

  await req.comment.update({ content }); // from checkCommentOwnership middleware

  res.json({
    success: true,
    message: 'Updated comment successfully',
    data: req.comment
  });
});

const remove = asyncHandler(async (req, res) => {
  await req.comment.destroy();

  res.json({
    success: true,
    message: 'Deleted comment successfully'
  });
});

export default { create, getRecipeComments, getById, update, remove };
