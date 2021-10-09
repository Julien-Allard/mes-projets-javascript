let villeChoisie;

if("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition((position) => {
      const url = 'https://api.openweathermap.org/data/2.5/weather?lon=' + position.coords.longitude + '&lat=' + position.coords.latitude + '&appid=dc8c9152e8adaad0ec8bf635818c0d42&units=metric';
    console.log(url);

    let requete = new XMLHttpRequest();
    requete.open('GET', url);
    requete.responseType = 'json';
    requete.send();

    requete.onload = function() {
      if (requete.readyState === XMLHttpRequest.DONE) {
        if (requete.status === 200) {
          let reponse = requete.response;
          // console.log(reponse);
          let temperature = reponse.main.temp;
          let ville       = reponse.name;
          // console.log(temperature);
          document.querySelector('#temperature_label').textContent = temperature;
          document.querySelector('#ville').textContent = ville;
        }
        else {
          alert('Un problème est intervenu, merci de revenir plus tard.');
        }
      }
    }
  }, erreur, options);
}
else {
  villeChoisie = "Paris";
  recevoirTemperature();
}

var options = {
  enableHighAccuracy: true
}

let changerDeVille  = document.querySelector('#changer');
changerDeVille.addEventListener("click", () => {
  villeChoisie = prompt("Quelle ville souhaitez-vous choisir ?");
  recevoirTemperature(villeChoisie);
});

function erreur() {
  villeChoisie = "Paris";
  recevoirTemperature(villeChoisie);
}

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