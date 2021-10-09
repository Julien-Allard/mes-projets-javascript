//Ciblage des éléments qui seront utilisés
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const optionsFiltre = document.querySelector('#todo-filtres');
const nettoyage = document.querySelector('.clean-button');

//Création des différents évènements utilisés
todoButton.addEventListener('click', addTodo); //Quand on clique sur le bouton "ajouter" de l'input
todoList.addEventListener('click', checkSuppr); //Quand on clique sur les boutons check/supprimer d'un todo
nettoyage.addEventListener('click', toutSupprimer); //Quand on clique sur le bouton "Tout supprimer"
optionsFiltre.addEventListener('input', filtrer); //Quand on change la valeur du select (filtre)
document.addEventListener('DOMContentLoaded', appelSauvegarde); //Pour appeler todos sauvegardés au chargement de la page

//Fonction qui ajoute un todo
function addTodo(event) {
  event.preventDefault(); //Pour empêcher la page de submit vers back-end quand on clique sur le bouton ajouter de l'input

  //Todo div contenant le li et les deux boutons
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');

  //Créer le li
  const newTodo = document.createElement('li');
  newTodo.textContent = todoInput.value;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);

  //Ajouter un bouton "check"
  const checkButton = document.createElement('button');
  checkButton.innerHTML = '<i class="fas fa-check"></i>';
  checkButton.classList.add('check-button');
  todoDiv.appendChild(checkButton);

  //Ajouter un bouton "supprimer"
  const supprButton = document.createElement('button');
  supprButton.innerHTML = '<i class="fas fa-trash"></i>';
  supprButton.classList.add('suppr-button');
  todoDiv.appendChild(supprButton);

  //Ajouter le todo complet dans le ul .todo-list
  todoList.appendChild(todoDiv);

  sauvegardeLocale(todoInput.value);

  todoInput.value = ''; //Pour remettre à zéro la zone input après chaque nouvelle entrée

}

//Fonction qui gère le check et la suppression des todos via les boutons
function checkSuppr(e) {
  const objet = e.target; //Cible de l'event click

  // Supprimer un todo avec le suppr-button
  if (objet.className === 'suppr-button') {
    const todo = objet.parentElement;
    todo.classList.add('jeter'); //Ajoute la classe indiquée à l'élément parent du bouton suppr (c'est à dire le div todo) pour changer style via CSS
    supprLocal(todo);
    todo.addEventListener('transitionend', () => { //Lance l'event une fois le changement de style effectué
      todo.remove();
    });
  }

  //Pour check ou uncheck un todo avec le check-button
  if (objet.className === 'check-button') {
    const fait = objet.parentElement;
    fait.classList.toggle('fait'); //Permet d'ajouter/retirer la classe fait, changement de style via CSS, d'un seul clic
  }
}

//Utilisation de filtres pour les todos
function filtrer(e) {
  const taches = todoList.childNodes; //Variable contenant tous les todos, va créer un array

  taches.forEach(function (todo) { //forEach va faire passer une fonction sur chaque élément du array "taches"
    switch (e.target.value) { //Switch pour cibler les classes de chaque <option> du <select> et agir en conséquence
      case "tout":
        todo.style.display = "flex"; //Fait tout apparaître
        break;
      case "dejafait":
        if (todo.classList.contains('fait')) { //Fait apparaître uniquement les todos contenant la classe .fait (cf. fonction checkSuppr)
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "pasfait":
        if (!todo.classList.contains('fait')) { //Fait l'inverse du case précédent (avec signe "!")
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

//Pour stocker les todos même si on ferme la page ou le navigateur.
//Le paramètre infos se réfère à input.value (cf. fonction addTodo plus haut).
function sauvegardeLocale(infos) {
  let donnees;
  if (localStorage.getItem("sauvegarde") === null) { //Si clé "sauvegarde" n'existe pas dans le localStorage
    donnees = []; //alors variable donnees devient un tableau (afin de pouvoir stocker plusieurs éléments)
  } else {
    donnees = JSON.parse(localStorage.getItem("sauvegarde")); //Sinon on appelle données stockées dans localStorage et on les stocke dans la variable donnees.
  }
  donnees.push(infos); //Tout nouvel "infos" (input.value) est stocké dans la variable donnees
  localStorage.setItem("sauvegarde", JSON.stringify(donnees)); //puis toutes les données de la variable sont envoyées dans le localStorage à la clé "sauvegarde"
}

//Récupérer les todos au rechargement/réouverture de la page.
//Création de chaque todo mais source du texte différente.
function appelSauvegarde() {
  let donnees;
  if (localStorage.getItem("sauvegarde") === null) {
    donnees = [];
  } else {
    donnees = JSON.parse(localStorage.getItem("sauvegarde"));
  }

  donnees.forEach(function (donnee) { //Nous allons réappliquer la création de chaque todo, mais au lieu de prendre le input.value pour le texte nous allons prendre chaque donnée enregistrée dans le localStorage (forEach)
    //Todo div contenant le li et les deux boutons
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //Créer le li
    const newTodo = document.createElement('li');
    newTodo.textContent = donnee; //Nous remplaçons ici le input.value par donnee, qui fait référence au paramètre de la fonction de la boucle forEach qui représente les éléments contenus dans la variable donnees (éléments étant des input.value)
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //Ajouter un bouton "check"
    const checkButton = document.createElement('button');
    checkButton.innerHTML = '<i class="fas fa-check"></i>';
    checkButton.classList.add('check-button');
    todoDiv.appendChild(checkButton);

    //Ajouter un bouton "supprimer"
    const supprButton = document.createElement('button');
    supprButton.innerHTML = '<i class="fas fa-trash"></i>';
    supprButton.classList.add('suppr-button');
    todoDiv.appendChild(supprButton);

    //Ajouter le todo complet dans le ul .todo-list
    todoList.appendChild(todoDiv);
  });
}

//Faire en sorte qu'une todo supprimée avec le bouton suppr-button soit aussi supprimée du localStorage.
//Sinon, impossibilité de faire disparaître définitivement un élément car sauvegardé dans le localStorage, il réapparaîtra à chaque chargement de la page.
function supprLocal(ligne) {
  let donnees;
  if (localStorage.getItem("sauvegarde") === null) {
    donnees = [];
  } else {
    donnees = JSON.parse(localStorage.getItem("sauvegarde"));
  }
  const indexTodo = ligne.children[0].innerText; //Prend en référence le todo (paramètre "ligne" de supprLocal). Va cibler le texte (innerText) du premier élément enfant (children[0]) du todo (ligne).
  donnees.splice(donnees.indexOf(indexTodo), 1); //Suppression (splice) qui cible l'index (indexOf) du indexTodo (c'est à dire le texte du premier élément enfant du div todo)
  localStorage.setItem("sauvegarde", JSON.stringify(donnees));
}

//Pour supprimer toutes les todos (visuellement et dans le localStorage)
function toutSupprimer() {
  let confirmation = confirm('Souhaitez-vous supprimer toutes les tâches ?\nATTENTION : Cette suppression est définitive.');

  if (confirmation == true) {
    let poubelle = todoList.childNodes; //Cible tous les éléments enfants de todoList
    poubelle.forEach(function (liste) { //Itération sur chaque élément enfant de todoList pour effet identique que bouton suppr-button mais sur toutes les todos
      liste.classList.add('jeter');
      liste.addEventListener('transitionend', () => {
        liste.remove();
      });
    });
    localStorage.clear(); //Nettoyage du localStorage pour éviter réapparition des todos au chargement de la page
  }
}