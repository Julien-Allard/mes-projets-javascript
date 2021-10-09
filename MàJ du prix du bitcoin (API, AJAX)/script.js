const url = "https://blockchain.info/ticker"; // stocke l'URL vers une API donnant le prix du bitcoin

function recupererPrix() { // on créé une fonction englobant tout notre code afin de pouvoir la réutiliser plus tard avec setInterval
  let requete = new XMLHttpRequest(); // créé un nouvel objet XMLHttpRequest
  requete.open('GET', url); // ouvre une nouvelle requête. 2 paramètres requis : GET (pour URL) ou POST (pour un formulaire), puis l'URL
  requete.responseType = 'json'; // donne le type de réponse attendue, ici du JSON
  requete.send(); // envoie la requête

  requete.onload = function() { // exécute la fonction une fois la réponse reçue (.onload)
    if(requete.readyState === requete.DONE) { // vérifie que l'état actuel (.readyState) de la requête est "terminé" (.DONE)
      if(requete.status === 200) { // vérifie que le code d'état HTTP numérique de la réponse (.status) est égal en valeur et en type (===) à 200 (aucune erreur)
        let reponse = requete.response; // stocke la réponse dans une variable (et donc les valeur de l'API)
        let prixEnEuros = reponse.EUR.last; // va chercher une valeur précise dans la réponse (ici le dernier prix du bitcoin en euros) et la stocke dans une variable
        document.querySelector('#price_label').textContent = prixEnEuros; // sélectionne l'ID price_label et change son texte en la valeur de la variable ci-dessus
      }
      else {
        alert("Un problème est intervenu, merci de revenir plus tard."); // affiche un message d'alerte à l'utilisateur si les conditions if précédentes ne sont pas remplies
      }
    }
  }
}

setInterval(recupererPrix, 1000); // va relancer la fonction permettant de récupérer notre prix toutes les 5 secondes