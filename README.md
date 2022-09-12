<div id="top"></div>

<div align="center">
  <h3 align="center">Amidio API</h3>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">Apropos de l'API</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
API simple pour une vente d'objet

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

Les technologies utilisées : 

* [![Angular][Angular.io]][Angular-url] pour le front
* [![Expressjs][Epxressjs.com]][Expressjs-url] pour le back
* [![MongoDB][MongoDB.org]][Mongodb-url]

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

Les étapes à suivre afin de l'utiliser

### Prerequisites
Installer nodejs
* node & npm
  ```sh
  npm install npm@latest -g
  ```

### Installation


1. Clone the repo
   ```sh
   git clone https://github.com/amada10/crud-nodejs/edit/master
   ```
2. Place dans le dossier
  ```sh
   cd crud-nodejs
   ```
3. Install NPM packages
   ```sh
   npm install
   ```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Les routes : 
### GET UN SEUL PRODUIT
  ```
0. GET http://<host>:3000/api/stuff/ (get un seul produit)
   Authorization: Bearer <token>
   ```
   => RETOUR : 
   ```
   {
      "title": titre ou nom du produit,
      "description": description du produit,
      "imageUrl": lien de l'image,
      "userId": id de l'utilisateur,
      "price": prix du produit
   }
   ```
   ### GET TOUS LES PRODUITS
  ```
1. GET http://<host>:3000/api/stuff/ (get tous les produits)
   Authorization: Bearer <token>
   ```
   => RETOUR : 
   ```
   {
      "title": titre ou nom du produit,
      "description": description du produit,
      "imageUrl": lien de l'image,
      "userId": id de l'utilisateur,
      "price": prix du produit
   }
   ```
   ### INSERT UN PRODUIT
   ```
2. POST http://<host>:3000/api/stuff/
  content-type: multipart/form-data
  Authorization: Bearer <token>
{
      "title": titre ou nom du produit,
      "description": description du produit,
      "imageUrl": fichier image,
      "price": prix du produit
}
```
=> RETOUR:
```
{
    "message": "Objet enregistrer"
}
```
### UPDATE UN PRODUIT
   ```
3. PUT http://<host>:3000/api/stuff/:id
  content-type: multipart/form-data
  Authorization: Bearer <token>
{
      "id: id de l'objet à modifier,
      "title": titre ou nom du produit,
      "description": description du produit,
      "imageUrl": fichier image,
      "price": prix du produit
}
```
=> RETOUR:
```
{
    "message": "Objet modifié"
}
```
### SUPPRIME UN PRODUIT
   ```
4. DELETE http://<host>:3000/api/stuff/:id
  content-type: multipart/form-data
  Authorization: Bearer <token>
{
      "id": id de l'objet à supprimer
}
```
=> RETOUR:
```
{
    "message": "Objet supprimer"
}
```

##LOGIN && SIGN UP
### login
```
5. POST http://<host>:3000/api/auth/login
  content-type: application/json
{
      "email": email de l'utilisateur,
      "password": mot de passe de l'utilisateur
}
```
=> RETOUR:
```
{
    "userId": id de l'utilisateur,
    "token": token 
}
```
### Signup
```
6. POST http://<host>:3000/api/auth/signup
  content-type: application/json
{
      "email": email de l'utilisateur,
      "password": mot de passe de l'utilisateur
}
```
=> RETOUR:
```
{
    "message": "Utilisateur créé"
}
```

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
