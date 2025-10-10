import asyncHandler from '../../utils/asyncHandler.js';
import UserService from './user.service.js';

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await UserService.getUserById(req.params.id);

  res.json({
    success: true,
    data: user
  });
});

export const getUserRecipes = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const { recipes, count } = await UserService.getUserRecipes(req.params.id, page, limit);

  res.json({
    success: true,
    data: recipes,
    pagination: {
      page,
      limit,
      total_items: count,
      total_pages: Math.ceil(count / limit)
    }
  });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { name, username, bio, avatar } = req.body;
  const user = await UserService.updateProfile(req.user.id, { name, username, bio, avatar });

  res.json({
    success: true,
    message: 'Updated user successfully',
    data: user
  });
});

export const deleteAccount = asyncHandler(async (req, res) => {
  await req.user.destroy();

  res.json({
    success: true,
    message: 'Deleted user successfully'
  });
});
