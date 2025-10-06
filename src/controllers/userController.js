import { User, Recipe, Category } from '../models/index.js';
import asyncHandler from '../utils/asyncHandler.js';

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: ['id', 'name', 'username', 'bio', 'avatar', 'createdAt']
  });

  if (!user) {
    return res.status(404).json({
      success: false,
      error: { message: 'User not found' }
    });
  }

  res.json({
    success: true,
    data: user
  });
});

const getUserRecipes = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const { count, rows: recipes } = await Recipe.findAndCountAll({
    where: { authorId: id },
    limit,
    offset,
    order: [['createdAt', 'DESC']],
    include: [
      {
        model: User,
        as: 'author',
        attributes: ['id', 'name', 'username', 'avatar']
      },
      {
        model: Category,
        as: 'categories',
        attributes: ['name', 'displayName'],
        through: { attributes: [] }
      }
    ]
  });

  res.json({
    success: true,
    data: {
      recipes,
      pagination: {
        page,
        limit,
        total: count,
        pages: Math.ceil(count / limit)
      }
    }
  });
});

const updateProfile = asyncHandler(async (req, res) => {
  const { name, username, bio, avatar } = req.body;

  await req.user.update({
    ...(name !== undefined && { name }),
    ...(username !== undefined && { username }),
    ...(bio !== undefined && { bio }),
    ...(avatar !== undefined && { avatar })
  });

  res.json({
    success: true,
    message: 'Updated user successfully',
    data: req.user
  });
});

const deleteAccount = asyncHandler(async (req, res) => {
  await req.user.destroy();

  res.json({
    success: true,
    message: 'Deleted user successfully'
  });
});

export default { getUserProfile, getUserRecipes, updateProfile, deleteAccount };
