const usersRouter = require('express').Router();
const {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');
const {
  validationUserId, validationUserInfo, validationAvatar
} = require('../middlewares/validation');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getCurrentUser);
usersRouter.get('/users/:userId', validationUserId, getUserById);
usersRouter.patch('/users/me', validationUserInfo, updateProfile);
usersRouter.patch('/users/me/avatar', validationAvatar, updateAvatar);

module.exports = usersRouter;