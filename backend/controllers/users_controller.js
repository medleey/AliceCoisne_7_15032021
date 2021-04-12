const bcrypt = require('bcrypt'); //données de cryptage et hachage 
const jwt = require('jsonwebtoken');
const db = require('../models');
let validator = require("email-validator");
const { posts, comments } = require('../models');
//const User = require('../models/user_model');

//POUR S'INSCRIRE
exports.register = (req, res, next) => {
  db.users.findOne({ where: {email: req.body.email} }).then((user) => {
    if(!user){
      bcrypt.hash(req.body.password, 10) //salage du mdp
        .then(hash => {
          //vérification email via validator.validate (package - npm install)
          let formValide = validator.validate(req.body.email); // true
          if (formValide) { 
            const user = db.users.create({
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              password: hash,
              service: req.body.service,
              isAdmin: false
            })
              .then((user) => {
                res.status(201).json({
                    message: 'Utilisateur créé !'
                  })
              }).catch(error => res.status(500).json({ error }));
          } else {
            res.status(400).json({ 
              email: 'Le format de votre adresse est invalide'
            })
          }
        })
        .catch(error => res.status(500).json({ error }));
    } else {
      res.status(400).json({email: 'Email déjà utilisé'});
    }
  }).catch(error => res.status(500).json({ error }));
};

//POUR SE CONNECTER
exports.login = (req, res, next) => {
  db.users.findOne({ where: {email: req.body.email} }) //cherche l'adresse mail entrée 
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' }); 
      }
      bcrypt.compare(req.body.password, user.password) //Compare le password dans la BDD avec celui du user 
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user.id,
            token: jwt.sign( //encode le nouveau token
              { userId: user.id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => {
          res.status(500).json({ error });
        });
    })
    .catch(error => res.status(500).json({ error }));
};

// POUR MODIFIER SES INFORMATIONS 
exports.update = (req, res, next) => {
  const paramsToModify = {service: req.body.userService};

  if (req.body.imageUrl) {
    req.body.imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
    paramsToModify.profilPicture = req.body.imageUrl;
  }
    db.users.findOne({where:{id: req.body.userId}})
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' }); 
      }
      this.updateUser(paramsToModify,req.body.userId,res);
      
    }).catch(error => res.status(500).json({ error }));
 };

 exports.updateUser = (paramsToModify, userId, res) => {
  db.users.update(paramsToModify,{where:{id: userId}})
  .then(() => res.status(200).json({ message: "db.users et infos des posts modifiées !" }))
  .catch((error) => {res.status(500).json({ error })});
 }

//POUR RECHERCHER LES INFOS USER 
exports.getOneUser = (req, res, next) => {
  db.users.findOne({ where: {id: req.params.id} }) 
    .then(user => {
      if (!user) { //! = négation
        return res.status(401).json({ error: 'Utilisateur non trouvé !' }); 
      }
      res.status(200).json({
        user: user //renvoie l'objet user en entier
      });
    })
    .catch(error => res.status(500).json({ error }));
};

//POUR SUPPRIMER SON COMPTE
exports.deleteUser = (req, res, next) => {
  db.users.destroy({where:{id: req.params.id}})
    .then(() => db.posts.destroy({where:{userId : req.params.id}}))
    .then(() => db.comments.destroy({where:{userId : req.params.id}}))
    .then(() => res.status(200).json(req.params.id + " has been deleted"))
    .catch((error) => res.status(500).json({error: error}));
};