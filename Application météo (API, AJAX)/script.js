let villeChoisie = "Paris";
recevoirTemperature(villeChoisie);

let changerDeVille  = document.querySelector('#changer');
changerDeVille.addEventListener("click", () => {
  villeChoisie = prompt("Quelle ville souhaitez-vous choisir ?");
  recevoirTemperature(villeChoisie);
});

function recevoirTemperature(ville) {  
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + ville + "&appid=e44b3dcbdaebdf1fd8330588dc6080b0&units=metric";
  
  let requete = new XMLHttpRequest();
  requete.open('GET', url);
  requete.responseType = 'json';
  requete.send();

  requete.onload = function() {
    if(requete.readyState === XMLHttpRequest.DONE) {
      if(requete.status === 200) {
        let reponse = requete.response;
        let temperature = reponse.main.temp;        
        document.querySelector('#ville').textContent = ville;
        document.querySelector('#temperature_label').textContent = temperature;
      }
    }
    else {
      alert("Une erreur est survenue, merci de réessayer plus tard.");
    }
  }
}