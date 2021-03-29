const bcrypt = require('bcrypt'); //données de cryptage et hachage 
const jwt = require('jsonwebtoken');
const db = require('../models');
let validator = require("email-validator");
//const User = require('../models/user_model');

//POUR S'INSCRIRE
exports.register = (req, res, next) => {
  
  bcrypt.hash(req.body.password, 10) // plus il y a de boucles, plus c'est dur de casser de code = salage du mdp
    .then(hash => {
      //vérification email via validator.validate (package - npm install)
      let formValide = validator.validate(req.body.email); // true
      if (formValide) { 
        const user = db.users.create({ //permet de créer un nouvel user
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hash,
          service: req.body.service
        })
          .then((user) => {
            console.log(user);
            res.status(201).json({
                message: 'Utilisateur créé !'
              })
          })
          .catch(error => res.status(400).json({ error }));
      } else {
        res.status(400).json({ 
          email: 'Le format de votre adresse est invalide'
        })
      }
    })
    .catch(error => res.status(500).json({ error }));
};

//POUR SE CONNECTER
exports.login = (req, res, next) => {
  db.users.findOne({ where: {email: req.body.email} }) //va rechercher l'adresse mail entrée 
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
              { userId: user._id },
              'RANDOM_TOKEN_SECRET', //chaine de caractères secrets 
              { expiresIn: '24h' } //le token expire au bout de 24h
            )
          });
        })
        .catch(error => {
          res.status(500).json({ error });
        });
    })
    .catch(error => res.status(500).json({ error }));
};