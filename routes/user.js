const express = require('express');
const router = express.Router();
const { getUsers, createUser, deleteUser, getUser } = require('../controllers/userController');


// @route   GET api/users

router.route('/')
    .get(getUsers)
    .post(createUser);

module.exports = router;