const db = require("../models");
const jwt = require("jsonwebtoken");

exports.createComment = (req, res, next) => {
    db.posts
      .create(req.body)
      .then(() => res.status(201).json({ message: "Post créé !" }))
      .catch((error) => res.status(400).json({ error }));
  };

exports.editComment = (req, res, next) => {
  db.comments
  .findOne({
    where: {
      id: req.params.commentId,
    },
  })
  .then((comment) => {
    comment.content = req.body.content;
    if (
      jwt.verify(token, "txRcW5wXc0jlGKupdavvxTQ4Fd8P7Jzcqa4GmM6CJC5VYOySzdaoFc5Pg2mCb04dY9X6s16d65NiBxtGqagr6bd2UCa4721QgfIWMuBwMIWhzeY8Z3Y4s2DoSGXeNV2c")
        .isOp ||
      jwt.verify(token, "txRcW5wXc0jlGKupdavvxTQ4Fd8P7Jzcqa4GmM6CJC5VYOySzdaoFc5Pg2mCb04dY9X6s16d65NiBxtGqagr6bd2UCa4721QgfIWMuBwMIWhzeY8Z3Y4s2DoSGXeNV2c")
        .userId == comment.userId
    ) {
      comment.save();
      res.status(200).json(comment.id + " a été modifié");
    } else {
      res.status(401).json("Tentative de piratage détectée");
    }
  })
  .catch((error) => {
    res.status(404).json({
      error: error,
    });
  });
};

  exports.deleteComment = (req, res, next) => {
    db.comments
      .findOne({
        where: {
          id: req.params.commentId,
        },
      })
      .then((comment) => {
        if (
          jwt.verify(token, "txRcW5wXc0jlGKupdavvxTQ4Fd8P7Jzcqa4GmM6CJC5VYOySzdaoFc5Pg2mCb04dY9X6s16d65NiBxtGqagr6bd2UCa4721QgfIWMuBwMIWhzeY8Z3Y4s2DoSGXeNV2c")
            .isOp ||
          jwt.verify(token, "txRcW5wXc0jlGKupdavvxTQ4Fd8P7Jzcqa4GmM6CJC5VYOySzdaoFc5Pg2mCb04dY9X6s16d65NiBxtGqagr6bd2UCa4721QgfIWMuBwMIWhzeY8Z3Y4s2DoSGXeNV2c")
            .userId == comment.userId
        ) {
          comment.destroy();
          res.status(200).json(comment.id + " has been deleted");
        } else {
          res.status(401).json("Tentative de piratage détectée");
        }
      })
      .catch((error) => {
        res.status(404).json({
          error: error,
        });
      });
  };