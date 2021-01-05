const express = require('express');

const router = express.Router();
const {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController.js');

// GET all users
router.get('/', getAllUsers);

// GET one user
router.get('/:id', getOneUser);

// POST add a user
router.post('/', createUser);

// PATCH (update) a user
router.patch('/:id', updateUser);

// DELETE one user
router.delete('/:id', deleteUser);

module.exports = router;
