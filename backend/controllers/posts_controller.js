const db = require("../models");
const jwt = require("jsonwebtoken");
const Post = require('../models/post');
const fs = require('fs')

exports.createOnePost = (req, res, next) => {
  if (req.body.imageUrl) {
    req.body.image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
  }
  db.posts
    .create(req.body)
    .then((response) => {
      db.posts.findOne({
          include: [{
            model: db.users
          }],
          where: {
            id: response.dataValues.id //permet de n'avoir qu'un seul post 
          }
        }).then(post => res.status(200).json(post))
        .catch(error => res.status(500).json({
          error
        }));
    })
    .catch((error) => res.status(500).json({
      error
    }));
};

//POUR RECHERCHER TOUS LES POSTS
exports.getAllPosts = (req, res, next) => { //req = request, res = response 
  db.posts.findAll({
      include: [{
          model: db.users
        },
        {
          model: db.comments,
          include: [db.users]
        },
      ],
      order: [
        ['createdAt', 'DESC'],
        [db.comments, 'createdAt', 'ASC']
      ]
    })
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(500).json({
      error
    }));
};

//POUR CHERCHER UN POST 
exports.getOnePost = (req, res, next) => {
  db.posts.findOne({
      id: req.params.id
    })
    .then(post => res.status(200).json(post)) 
    .catch(error => res.status(404).json({
      error
    }));  
}

//POUR SUPPRIMER UN POST 
exports.deleteOnePost = (req, res, next) => {
  const postId = req.params.id;

//TROUVER LE POST A SUPPRIMER ET FAIRE UNLINK IMG   
  db.posts.findOne({
    where: {
      id: postId
    }
  }).then((post)=> {
    const filename = post.image.split('/images/');
    if (filename.length > 1) {
      fs.unlink(`images/${filename[1]}`, () => {});
    }
  })
  
// SUPPRESSION DU POST ET DU COMMENTAIRE
  db.posts.destroy({
      where: {
        id: postId
      }
    })
    .then(() => {
      db.comments.destroy({
          where: {
            postId: postId
          }
        }).then(() => res.status(200).json({
          message: 'Post + commentaires supprimés !'
        })).catch(error => res.status(500).json({
          message: 'post supprimé mais commentaire non supprimé'
        }))
    })
    .catch(error => res.status(500).json({
      message: 'post et commentaires non supprimés'
    }));
};