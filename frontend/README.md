# LeBonCoin Clone - Projet de Petites Annonces

Ce projet est une application web de petites annonces inspirée de LeBonCoin, développée avec une architecture **MERN** (MongoDB, Express.js, React.js, Node.js).

## Fonctionnalités

- **Inscription et Connexion :** Les utilisateurs peuvent s'inscrire et se connecter. L'authentification est gérée via JWT.
- **CRUD des Annonces :** Les utilisateurs peuvent créer, lire, mettre à jour et supprimer leurs annonces.
- **Filtrage par Catégorie :** Possibilité de filtrer les annonces par catégorie.
- **Détails d'une Annonce :** Affichage détaillé d'une annonce avec les informations de l'auteur.
- **Gestion des Utilisateurs :** Les utilisateurs peuvent mettre à jour ou supprimer leur compte.

## Technologies Utilisées

- **Frontend :** React.js avec React Router pour la navigation.
- **Backend :** Node.js avec Express.js pour créer une API RESTful.
- **Base de Données :** MongoDB avec Mongoose pour la modélisation.
- **Authentification :** JSON Web Tokens (JWT).
- **Style :** CSS de base.

## Installation

### Prérequis

- Node.js et npm installés sur votre machine.
- MongoDB installé et en cours d'exécution.

### Étapes

1. **Cloner le dépôt :**

   ```bash
   git clone https://github.com/DamienLortieThibaut/TP-NOTE-IPSSI-LEBONCOIN-DAMIEN.git
   ```

2. **Installer les dépendances pour le frontend et le backend :**

   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

3. **Configurer les variables d'environnement :**

   Créez un fichier `.env` à la racine du projet et ajoutez les variables suivantes :

   ```env
   JWT_EXPIRES_IN=delay
   JWT_SECRET=your_jwt_secret
   ```

4. **Démarrer l'application :**

   Dans le répertoire frontend et backend, exécutez :

   ```bash
   npm start
   ```

## Utilisation

Une fois l'application démarrée, vous pouvez accéder à l'interface utilisateur via `http://localhost:3000` et à l'API backend via `http://localhost:8080`.

## Contribution

Les contributions sont les bienvenues ! Veuillez soumettre une pull request pour toute amélioration ou correction de bug.

## Auteur

Damien Lortie - Développeur Principal