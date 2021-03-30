const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const postsCtrl = require("../controllers/posts_controller.js");

router.get("/", auth, postsCtrl.getAllPosts);
router.post("/", multer, postsCtrl.createOnePost);
//router.get("/:userId", auth, postsCtrl.getAllPostsUser);
router.get("/:id", auth, postsCtrl.getOnePost);
router.put("/:id", auth, multer, postsCtrl.editOnePost);
router.delete("/:id", auth, postsCtrl.deleteOnePost);
//router.post("/:id/comment", auth, postsCtrl.comment);

module.exports = router;