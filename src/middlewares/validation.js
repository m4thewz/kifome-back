import { body, param, query, validationResult } from 'express-validator';

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Validation error',
        details: errors.array()
      }
    });
  }
  next();
};

export const validateObjectId = paramName => {
  return param(paramName).custom(value => {
    if (!Number.isInteger(value) || Number(id) < 0) {
      throw new Error('Invalid ID');
    }
    return true;
  });
};

export const validateUserRegister = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Name must be between 1 and 100 characters long')
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/)
    .withMessage('Nome deve conter apenas letras'),

  body('email').trim().isEmail().withMessage('Invalid email').normalizeEmail(),

  body('password')
    .isLength({ min: 8, max: 255 })
    .withMessage('Password must be between 8 and 255 characters long'),

  body('username')
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters long')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username must contain only letters, numbers and underscores'),

  handleValidationErrors
];

export const validateUserLogin = [
  body('email').trim().isEmail().withMessage('Invalid email').normalizeEmail(),

  body('password').notEmpty().withMessage('Password is required'),

  handleValidationErrors
];

export const validateUserUpdate = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Name must be between 1 and 100 characters long'),

  body('username')
    .optional()
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters long')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username must contain only letters, numbers and underscores'),

  handleValidationErrors
];

export const validateRecipeCreate = [
  body('title')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters long')
    .escape(),

  body('description')
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage('Description must be between 1 and 500 characters long')
    .escape(),

  body('ingredients')
    .isArray({ min: 1, max: 50 })
    .withMessage('Must contain between 1 and 50 ingredients'),

  body('ingredients.*.name')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Each ingredient name must contain between 1 and 200 characters long')
    .escape(),

  body('ingredients.*.quantity')
    .trim()
    .isLength({ min: 1, max: 10 })
    .withMessage('Each ingredient quantity must contain between 1 and 10 characters long')
    .escape(),

  body('ingredients.*.unit')
    .trim()
    .isIn(['unit', 'kg', 'g', 'l', 'ml', 'cup', 'tablespoon', 'teaspoon', 'pinch', 'slice'])
    .withMessage('Invalid unit')
    .escape(),

  body('difficulty').optional().isIn(['easy', 'medium', 'hard']).withMessage('Invalid difficulty'),

  body('preparation').trim().isLength({ min: 1 }).withMessage('Preparation is required').escape(),

  body('prepTime')
    .isInt({ min: 1, max: 1440 })
    .withMessage('Preparation time must be between 1 and 1440 minutes'),

  body('cookTime')
    .optional()
    .isInt({ min: 1, max: 1440 })
    .withMessage('Cook time must be between 1 and 1440 minutes'),

  body('portionQuantity')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Portions must be between 1 and 100'),

  body('portionUnit')
    .optional()
    .isIn(['serving', 'slice', 'unit', 'cup', 'bowl'])
    .withMessage('Invalid portion unit'),

  body('category').optional().isArray({ max: 50 }).withMessage('Must have less than 50 categories'),

  body('category.*')
    .optional()
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage('Each category must be between 1 and 30 characters long'),

  handleValidationErrors
];

export const validateRecipeUpdate = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters long')
    .escape(),

  body('description')
    .optional()
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage('Description must be between 1 and 500 characters long')
    .escape(),

  body('ingredients')
    .optional()
    .isArray({ min: 1, max: 50 })
    .withMessage('Must contain between 1 and 50 ingredients'),

  body('ingredients.*.name')
    .optional()
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Each ingredient name must contain between 1 and 200 characters long')
    .escape(),

  body('ingredients.*.quantity')
    .optional()
    .trim()
    .isLength({ min: 1, max: 10 })
    .withMessage('Each ingredient quantity must contain between 1 and 10 characters long')
    .escape(),

  body('ingredients.*.unit')
    .optional()
    .trim()
    .isIn(['unit', 'kg', 'g', 'l', 'ml', 'cup', 'tablespoon', 'teaspoon', 'pinch', 'slice'])
    .withMessage('Invalid unit')
    .escape(),

  body('preparation')
    .optional()
    .trim()
    .isLength({ min: 1 })
    .withMessage('Preparation is required')
    .escape(),

  body('prepTime')
    .optional()
    .isInt({ min: 1, max: 1440 })
    .withMessage('Preparation time must be between 1 and 1440 minutes'),

  body('difficulty').optional().isIn(['easy', 'medium', 'hard']).withMessage('Invalid difficulty'),

  body('cookTime')
    .optional()
    .isInt({ min: 1, max: 1440 })
    .withMessage('Cook time must be between 1 and 1440 minutes'),

  body('portionQuantity')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Portions must be between 1 and 100'),

  body('portionUnit')
    .optional()
    .isIn(['serving', 'slice', 'unit', 'cup', 'bowl'])
    .withMessage('Invalid portion unit'),

  body('category').optional().isArray({ max: 50 }).withMessage('Must have less than 50 categories'),

  body('category.*')
    .optional()
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage('Each category must be between 1 and 30 characters long'),

  handleValidationErrors
];

export const validateComment = [
  body('content')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Comment must be between 1 and 1000 characters long')
    .escape(),

  handleValidationErrors
];

export const validateRating = [
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),

  handleValidationErrors
];

export const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1, max: 1000 })
    .withMessage('Page must be between 1 and 1000'),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 1000'),

  handleValidationErrors
];

export const validateRecipeQuery = [
  query('search')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Search must be less than 100 characters')
    .escape(),

  query('category').optional().isInt({ min: 1 }).withMessage('Invalid category ID'),

  query('sortBy').optional().isIn(['newest', 'popular', 'rating']).withMessage('Wrong ordering'),

  ...validatePagination
];

export const validateId = [
  param('id').isInt({ min: 1 }).withMessage('Invalid ID'),
  handleValidationErrors
];
