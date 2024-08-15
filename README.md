# Installation et Explication du code Form.html et Form.js #

## Prérequis

`Node.js`
`npm`

### Installation :

**Clonez le dépôt sur votre machine locale :**

```bash
   git clone https://github.com/Midza21/manage_users.git
   ```
```bash
   cd manage_users
   ```

**Installez les dépendances nécessaires :**

Pour faire fonctionner ce programme, vous devez installer dans votre terminal dans le répertoire de votre projet :

```bash
   npm install
   ```


```bash
   npm install express body-parser
   ```

## Page Form.js 

**/submit :** Dans le balise "action" le faite de mettre `/submit` (ou n'importe quel mot) va permet de rediriger l'envoie des données qui était dans le formulaire, vers la page Form.js pour qu'il crée un nouveau utilisateur dans le tableau des utilisateurs.


**id :** Pour la récupération des données la balise `id` va jouer un role important car elle permettra au code sur le fichier Form.js d'identifier les bonnes informations concernants chacune des balises `input`.

## Page Form.js

**Ajout d'un tableau `users[ ]` :** On utilise un tableau en mémoire pour stocker les informations des utilisateurs. Chaque utilisateur est identifié par un id.

**Route `/users` :** Cette route affiche la liste des utilisateurs avec des liens pour modifier ou supprimer chaque utilisateur.

**Route `/edit/:id` :** Cette route affiche un formulaire pré-rempli pour modifier les informations d'un utilisateur. Le formulaire soumet les nouvelles données via une requête POST à la même URL.

**Route `/delete/:id` :** Cette route permet de supprimer un utilisateur spécifique basé sur son id.

**Redirection :** Après chaque modification ou suppression, l'utilisateur est redirigé vers la liste des utilisateurs (/users).

### Exécutez le fichier form.js avec la commande suivante :

```bash
   node index.js
   ```

Cela démarrera un serveur web local à l'adresse http://localhost:3000. Lorsque vous y accédez, un formulaire est affiché, vous permettant de saisir un nom, prénom, adresse et email. Après soumission, les données sont affichées sur une nouvelle page.

### Accéder aux options :

Taper à http://localhost:3000/users pour voir la liste des utilisateurs, avec des options pour modifier ou supprimer chaque entrée.
