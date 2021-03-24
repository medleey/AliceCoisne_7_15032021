const db = require("../models");
const jwt = require("jsonwebtoken");

exports.createPost = (req, res, next) => {
    if (req.body.imageUrl) {
      req.body.imageUrl = `${req.protocol}://${req.get("host")}/images/${req.body.imageUrl}`;
    }
    db.posts
      .create(req.body)
      .then(() => res.status(201).json({ message: "Post créé !" }))
      .catch((error) => res.status(400).json({ error }));
  };


  