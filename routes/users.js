const router = require('express').Router();
const {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getUserById,
} = require('../controllers/users');
const {
  validationUserId, validationUserInfo, validationAvatar
} = require('../middlewares/validation');

router.get('/', getUsers);
router.get('/me', getUserById);
router.get('/:userId', validationUserId, getUserById);
router.patch('/me', validationUserInfo, updateProfile);
router.patch('me/avatar', validationAvatar, updateAvatar);

module.exports = router;