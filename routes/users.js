const express = require("express");
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
} = require('../controllers/users.js');

const router = express.Router();

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/', createUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateUser);

//module.exports = { usersRoutes };

export { router as usersRoutes};