const express = require('express');
const router = express.Router(); 
const userCtrl = require('../controllers/users_controller');
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);
router.put('/:id', auth, multer, userCtrl.update);
router.get('/:id', auth, userCtrl.getOneUser);
router.delete("/:id", auth, userCtrl.deleteUser);


module.exports= router;