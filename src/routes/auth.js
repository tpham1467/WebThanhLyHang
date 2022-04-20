const express = require('express');
const router = express.Router();

const AuthController = require('../app/controllers/AuthController')

router.get('/register', AuthController.showRegister);
router.post('/register', AuthController.register);
router.get('/login', AuthController.showLogin);
router.post('/login', AuthController.login);

module.exports = router
