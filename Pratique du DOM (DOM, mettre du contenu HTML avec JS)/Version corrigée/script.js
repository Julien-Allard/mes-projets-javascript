document.querySelector('#a-supprimer').remove();

// Créer les éléments
let header = document.createElement('header');
let menu   = document.createElement('div');
let p      = document.createElement('p');

// Les personnaliser
header.textContent = "Bienvenue";
header.style.backgroundColor = "#e3b04b";
header.style.color = "white";
header.style.padding = "30px";
header.style.fontSize = "3em";
header.style.textAlign = "center";

menu.innerHTML = "<a href='#'>Accueil</a> / <a href='#'>Une autre page</a>";
menu.style.backgroundColor = "#f1d6ab";
menu.style.padding = "15px";

p.textContent = "Ceci est un paragraphe créé avec JavaScript !";
p.style.margin = "15px";

// Les ajouter
document.body.append(header, menu, p);