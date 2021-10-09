let ouvrirBtn = document.querySelector('#ouvrir');
let redimensionnerBtn = document.querySelector('#redimensionner');
let fermerBtn = document.querySelector('#fermer');

ouvrirBtn.addEventListener('click', ouvrir);
redimensionnerBtn.addEventListener('click', redimensionner);
fermerBtn.addEventListener('click', fermer);

function ouvrir() {
  fenetre = window.open('', '', 'width=700, height=400');
}

function redimensionner() {
  fenetre.resizeTo(500, 300);
}

function fermer() {
  fenetre.close();
}