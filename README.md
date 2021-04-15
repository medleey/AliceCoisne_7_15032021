# AliceCoisne_7_15032021

## FRONTEND 
Pour lancer le front, il faut npm install puis npm start. Il est hébergé sur le localhost:8080.

## BACKEND
Pour lancer le front, il faut npm install puis npm start. Il est hébergé sur le localhost:3000
Il faut changer les configurations de connexion à la base de données dans le app.js.

## BDD 
Utilisation de mySQL.
Il faut modifier les variables du .env. (Créer un fichier .env avec la structure suivante :
DB_USER=monNomUser 
DB_NAME=nomBdd
DB_HOST=localhost
DB_PASS=monMotDePasse)

Vous pouvez utiliser la commande : npx sequelize-cli db:migrate pour migrer

Le script SQL est disponible à la racine du projet 
