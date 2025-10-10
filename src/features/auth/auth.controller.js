import asyncHandler from '../../utils/asyncHandler.js';
import AuthService from './auth.service.js';

export const register = asyncHandler(async (req, res) => {
  const { name, username, bio, avatar, email, password } = req.body;
  const { user, token } = await AuthService.register({
    name,
    username,
    bio,
    avatar,
    email,
    password
  });

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: user,
    token
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await AuthService.login(email, password);

  res.json({
    success: true,
    message: 'Login successful',
    data: user,
    token
  });
});

export const getMe = (req, res) => {
  res.json({
    success: true,
    data: req.user
  });
};
