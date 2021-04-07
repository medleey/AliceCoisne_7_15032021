const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const postsCtrl = require("../controllers/posts_controller.js");

router.get("/", auth, postsCtrl.getAllPosts);
router.post("/", auth, multer, postsCtrl.createOnePost);
router.get("/:id", auth, postsCtrl.getOnePost);
router.delete("/:id", auth, postsCtrl.deleteOnePost);

module.exports = router;