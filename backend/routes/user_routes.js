const express = require('express');
const router = express.Router(); 
const userCtrl = require('../controllers/users_controller');
const auth = require("../middleware/auth");

router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);
router.get('/:id', auth, userCtrl.getOneUser);


module.exports= router;