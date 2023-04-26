const router = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateInfo,
  updateAvatar,
  login,
  getInfo,
} = require('../controllers/users');

const auth = require('../middlewares/auth').default;
const {
  checkLogin, checkUser, checkUserData, checkUserAvatar, checkReg,
} = require('../utils/validation');

router.get('/users', auth, getUsers);
router.get('/users/me', auth, getInfo);
router.get('/users/:userId', auth, checkUser, getUserById);
router.patch('/users/me', auth, checkUserData, updateInfo);
router.patch('/users/me/avatar', auth, checkUserAvatar, updateAvatar);
router.post('/signin', checkLogin, login);
router.post('/signup', checkReg, createUser);

module.exports = router;
z