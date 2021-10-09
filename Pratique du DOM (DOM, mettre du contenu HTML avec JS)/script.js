// Supprimer le texte
document.querySelector('#a-supprimer').remove();

// Créer un header avec le message bienvenue
let bienvenue = document.createElement('header');
bienvenue.textContent = 'Bienvenue';
document.body.append(bienvenue);

// Créer un sous header
let navigation = document.createElement('header');
navigation.innerHTML = "<a href = #>Accueil</a>" + " / " + "<a href = #>Une autre page</a>";
document.body.append(navigation);

// Créer un paragraphe
let p = document.createElement('p');
p.textContent = "Ceci est un paragraphe écrit avec JavaScript !";
document.body.append(p);

// Style pour le header
let header = document.querySelectorAll('header')[0];
header.style.backgroundColor = '#e3b04b';
header.style.textAlign = 'center';
header.style.color = 'white';
header.style.fontWeight = 'bold';
header.style.fontSize = '30px';
header.style.padding = '0.7em';


// Style pour le sous header
let sousHeader = document.querySelectorAll('header')[1];
sousHeader.style.backgroundColor = '#f1d6ab';
sousHeader.style.padding = '0.5em';

