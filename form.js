const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Stockage des données en mémoire
let users = [];

// Route pour afficher le formulaire
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/form.html');
});

// Route pour soumettre le formulaire et AJOUTER UN UTILISATEUR
app.post('/submit', (req, res) => {
    const { nom, prenom, adresse, email } = req.body;
    const id = users.length + 1;

    users.push({ id, nom, prenom, adresse, email });

    res.redirect('/users');
});

// Route pour AFFICHER la liste des utilisateurs avec options de modification et suppression
app.get('/users', (req, res) => {
    let userTable = users.map(user => `
        <div class="bg">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>
        </div>
        
        <tr class="table table-dark">
            <td scope="col">${user.nom}</td>
            <td scope="col">${user.prenom}</td>
            <td scope="col">${user.adresse}</td>
            <td scope="col">${user.email}</td>
            <td scope="col"><a href="/edit/${user.id}" class="link-light">Modifier</a></td>
            <td scope="col"><a href="/delete/${user.id}" class="link-light">Supprimer</a></td>
        </tr>
    `).join('');

    res.send(`
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
        <h1>Liste des utilisateurs</h1>
        
        <table border="1" class="table table-dark">
            <thead>
                <tr>
                    <th scope="col">Nom</th>
                    <th scope="col">Prénom</th>
                    <th scope="col">Adresse</th>
                    <th scope="col">Email</th>
                    <th scope="col">Modifier</th>
                    <th scope="col">Supprimer</th>
                </tr>
                ${userTable}
        </table>
        <br>
        <a href="/" class="link-dark">Ajouter un nouvel utilisateur</a>
    `);
});

// Route pour afficher le formulaire de MODIFICATION d'un utilisateur
app.get('/edit/:id', (req, res) => {
    const user = users.find(u => u.id == req.params.id);

    if (user) {
        res.send(`
            <div class="bg">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>
            </div>

            <main class="form-signin">   
                <h1 class="h1">Modifier l'utilisateur</h1>

                <form action="/edit/${user.id}" method="POST">
                    <div class="form-floating">
                        <input type="text" class="form-control" id="nom" name="nom" value="${user.nom}" required>
                        <label for="nom">Nom</label>
                    </div>

                    <div class="form-floating">
                        <input type="text" class="form-control" id="prenom" name="prenom" value="${user.prenom}" required>
                        <label for="prenom">Prénom</label>
                    </div>
                    
                    <div class="form-floating">
                        <input type="text" class="form-control" id="adresse" name="adresse" value="${user.adresse}" required>
                        <label for="adresse">Adresse</label>
                    </div>

                    <div class="form-floating">
                        <input type="email" class="form-control" id="email" name="email" value="${user.email}" required>
                        <label for="email">Email</label>
                    </div>

                    <input class="w-100 btn btn-lg" type="submit" value="Modifier">
                </form>
            </main>
        `);
    } else {
        res.send('Utilisateur non trouvé');
    }
});

// Route pour TRAITER LA MODIFICATION d'un utilisateur
app.post('/edit/:id', (req, res) => {
    const { nom, prenom, adresse, email } = req.body;
    const userIndex = users.findIndex(u => u.id == req.params.id);

    if (userIndex >= 0) {
        users[userIndex] = { id: users[userIndex].id, nom, prenom, adresse, email };
        res.redirect('/users');
    } else {
        res.send('Utilisateur non trouvé');
    }
});

// Route pour SUPPRIMER un utilisateur
app.get('/delete/:id', (req, res) => {
    users = users.filter(u => u.id != req.params.id);
    res.redirect('/users');
});

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:8080/form.html`);
});