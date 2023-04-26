const router = require('express').Router();
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

router.get('/users', getUsers);
router.get('/users/me', getCurrentUser);
router.get('/users/:userId', validationUserId, getUserById);
router.patch('/users/me', validationUserInfo, updateProfile);
router.patch('/users/me/avatar', validationAvatar, updateAvatar);

module.exports = router;