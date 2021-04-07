const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const commentsCtrl = require("../controllers/comments_controller.js");

router.get("/", auth, commentsCtrl.getAllComments);
router.post("/", auth, multer, commentsCtrl.createComment);
router.put("/:id", auth, multer, commentsCtrl.editComment);
router.delete("/:id", auth, commentsCtrl.deleteOneComment);

module.exports = router;