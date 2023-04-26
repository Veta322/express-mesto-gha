const usersRouter = require('express').Router();
const {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');
const {
  validateProfile,
  validateAvarar,
  validateUserId,
} = require('../middlewares/validation');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getCurrentUser);
usersRouter.get('/:userId', validateUserId, getUserById);
usersRouter.patch('/me', validateProfile, updateProfile);
usersRouter.patch('/me/avatar', validateAvarar, updateAvatar);

module.exports = usersRouter;