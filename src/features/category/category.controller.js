import asyncHandler from '../../utils/asyncHandler.js';
import CategoryService from './category.service.js';

export const getAll = asyncHandler(async (req, res) => {
  const categories = await CategoryService.getAllCategories();

  res.json({
    success: true,
    data: categories
  });
});

export const getById = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const { category, recipes, count } = await CategoryService.getCategoryById(
    req.params.id,
    page,
    limit
  );

  const categoryJson = category.toJSON();
  categoryJson.recipes = recipes;

  res.json({
    success: true,
    data: categoryJson,
    pagination: {
      page,
      limit,
      total_items: count,
      total_pages: Math.ceil(count / limit)
    }
  });
});
