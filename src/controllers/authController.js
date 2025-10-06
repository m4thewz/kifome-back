import { User } from '../models/index.js';
import generateToken from '../utils/generateToken.js';
import asyncHandler from '../utils/asyncHandler.js';

const register = asyncHandler(async (req, res) => {
  const { name, username, bio, avatar, email, password } = req.body;

  const user = await User.create({
    name,
    username,
    bio,
    email,
    avatar,
    password
  });

  const token = generateToken(user.id);

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: user,
    token
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(404).json({
      success: false,
      error: { message: 'User not found' }
    });
  }

  const correctPassword = await user.comparePassword(password);

  if (!correctPassword) {
    return res.status(401).json({
      success: false,
      error: { message: 'Wrong password' }
    });
  }

  const token = generateToken(user.id);

  res.json({
    success: true,
    message: 'Login successful',
    data: user,
    token
  });
});

const getMe = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    data: req.user
  });
});

const deleteMe = asyncHandler(async (req, res) => {
  await req.user.destroy();

  res.json({
    success: true,
    message: 'Deleted user successfully'
  });
});

export default { register, login, getMe, deleteMe };
