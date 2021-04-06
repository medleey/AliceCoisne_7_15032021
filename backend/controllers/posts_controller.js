const db = require("../models");
const jwt = require("jsonwebtoken");
const Post = require('../models/post');
const { comments } = require("../models");

exports.createOnePost = (req, res, next) => {
  console.log(req.body)
    if (req.body.imageUrl) {
      req.body.image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
    }
    db.posts
      .create(req.body)
      .then(() => res.status(201).json({ message: "Post créé !" }))
      .catch((error) => res.status(400).json({ error }));
  };

//POUR RECHERCHER TOUS LES POSTS
  exports.getAllPosts = (req, res, next) => { //req = request, res = response 
    db.posts.findAll({
      include: [
        {model: db.users},
        {model: db.comments, include: [db.users]},
      ],
      order: [['createdAt', 'DESC']]
    })//find va chercher quelque chose, va chercher toutes les posts de la fonction au dessus
      .then(posts => res.status(200).json(posts))
      .catch(error => res.status(500).json({ error }));
  };
  
  //POUR POSTER UN POST
  exports.postOnePost = (req, res, next) => { //pour publier le post
    const postObject = JSON.parse(req.body.post);
    const post = new Post({ //converti le post en model, post qui est dans la bdd
      ...postObject,//spread ... utilisé pour faire la copie de tous les éléments de req.body
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`, //
      likes: 0,
      dislikes: 0,
      usersLiked: [],
      usersDisliked: [],
    })
    post.save() // renvoie une Promise
    .then(() => res.status(201).json({ message: 'Post enregistré!' })) //réponse 201 de réussite
    .catch(error => res.status(500).json({ error })); // message d'erreur générée par mongoose + code erreur 400
  };

  //POUR CHERCHER UN POST 
  exports.getOnePost = (req, res, next) => {
    db.posts.findOne({ _id: req.params.id })
      .then(post => res.status(200).json(post)) //ok
      .catch(error => res.status(404).json({ error })); //objet non trouvé 
  }

  //POUR MODIFIER UN POST
  exports.editOnePost = (req, res, next) => {
  const postObject = req.file ? //si nouvelle image, req.file, sinon traité la requete comme objet directement
    {
      ...JSON.parse(req.body.post), //récupère la chaine de caractère
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`//permet de modifier une img 
    } : { ...req.body };//corps de la requete 
  db.posts.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id }) //permet de mettre à jour 
    .then(() => res.status(200).json({ message: 'Post modifiée !' })) //ok
    .catch(error => res.status(500).json({ error }));
};

//POUR SUPPRIMER UNE POST 
exports.deleteOnePost = (req, res, next) => { //permet de supprimer un post
  db.posts.findOne({ id: req.params.id }) //va rechercher le post en question
    .then(post => {
      const filename = post.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        db.posts.deleteOne({ _id: req.params.id }) //supprime le post avec l'id recherché 
          .then(() => res.status(200).json({ message: 'Post supprimé !' })) //ok 
          .catch(error => res.status(500).json({ error }));
      });
    })
};