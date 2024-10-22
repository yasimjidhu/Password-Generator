const express = require('express');
const { generatePassword } = require('../controllers/passwordController');

const router = express.Router();

// Route to generate password
router.post('/', generatePassword);

module.exports = router;
