const db = require("../models");
const jwt = require("jsonwebtoken");

exports.getAllComments = (req, res, next) => { 
  db.comments.findAll({
    include: [
      {model: db.users, attributes: ['id','profilPicture', 'firstName', 'lastName']}
    ],
    order: [['createdAt', 'DESC']]
  })
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(500).json({ error }));
};

exports.createComment = (req, res, next) => {
  db.comments
      .create(req.body)
      .then((response) => {
        db.comments.findOne({
          include: [{model: db.users}],
          where : {
            id: response.dataValues.id 
          }
        }).then(comment => res.status(200).json(comment))
        .catch(error => res.status(500).json({error}));
      })
      .catch((error) => res.status(500).json({error}));
};

//POUR SUPPRIMER UN COMMENTAIRE
exports.deleteOneComment = (req, res, next) => { 
  db.comments.findOne({ id: req.params.id })
    .then(comment => {
        db.comments.destroy({
          where: {
            id: req.params.id
          }
          })

          .then(() => res.status(200).json({ message: 'commentaire supprimé !' })) //ok 
          .catch(error => res.status(500).json({ error }));
    })
};