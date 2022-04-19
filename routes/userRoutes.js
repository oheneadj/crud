const express = require('express');
const router = express.Router();
const { registerUser, loginUser, userData } = require('../controller/userController')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/me', userData)

module.exports = router;