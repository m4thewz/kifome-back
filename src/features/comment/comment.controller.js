import asyncHandler from '../../utils/asyncHandler.js';
import CommentService from './comment.service.js';

export const create = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const { id: recipeId } = req.params;

  const comment = await CommentService.createComment(content, recipeId, req.user.id);

  res.status(201).json({
    success: true,
    message: 'Created comment successfully',
    data: comment
  });
});

export const getRecipeComments = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const { comments, count } = await CommentService.getRecipeComments(req.params.id, page, limit);

  res.json({
    success: true,
    data: comments,
    pagination: {
      page,
      limit,
      total_items: count,
      total_pages: Math.ceil(count / limit)
    }
  });
});

export const getById = asyncHandler(async (req, res) => {
  const comment = await CommentService.getCommentById(req.params.id);

  res.json({
    success: true,
    data: comment
  });
});

export const update = asyncHandler(async (req, res) => {
  const { content } = req.body;

  await req.comment.update({ content }); // from checkCommentOwnership middleware

  res.json({
    success: true,
    message: 'Updated comment successfully',
    data: req.comment
  });
});

export const remove = asyncHandler(async (req, res) => {
  await req.comment.destroy();

  res.json({
    success: true,
    message: 'Deleted comment successfully'
  });
});
