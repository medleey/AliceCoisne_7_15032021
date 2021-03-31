const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const commentsCtrl = require("../controllers/comments_controller.js");

//router.get("/", auth, commentsCtrl.getAllComments);
router.post("/", auth, multer, commentsCtrl.createComment);
//router.get("/:userId", auth, commentsCtrl.getAllCommentsUser);
//router.get("/:id", auth, commentsCtrl.getOneComment);
router.put("/:id", auth, multer, commentsCtrl.editComment);
router.delete("/:id", auth, commentsCtrl.deleteComment);
//router.post("/:id/comment", auth, commentsCtrl.comment);

module.exports = router;