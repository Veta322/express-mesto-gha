const usersRouter = require('express').Router();
const {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');
const {
  checkUserData,
  checkUserAvatar,
  checkUserId,
} = require('../middlewares/validation');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getCurrentUser);
usersRouter.get('/users/:userId', checkUserId, getUserById);
usersRouter.patch('/users/me', checkUserData, updateProfile);
usersRouter.patch('/users/me/avatar', checkUserAvatar, updateAvatar);

module.exports = usersRouter;