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
const auth = require('../middlewares/auth');

usersRouter.get('/users', auth, getUsers);
usersRouter.get('/users/me', auth, getCurrentUser);
usersRouter.get('/users/:userId', auth, validationUserId, getUserById);
usersRouter.patch('/users/me', auth, validationUserInfo, updateProfile);
usersRouter.patch('/users/me/avatar', auth, validationAvatar, updateAvatar);

module.exports = usersRouter;