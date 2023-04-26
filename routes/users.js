const router = require('express').Router();
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

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', validateUserId, getUserById);
router.patch('/me', validateProfile, updateProfile);
router.patch('/me/avatar', validateAvarar, updateAvatar);

module.exports = router;