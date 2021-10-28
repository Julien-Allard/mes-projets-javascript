const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.querySelector('#title');
const cover = document.querySelector('#cover');
const timer = document.querySelector('.timer');
const playlist = document.querySelector('.playlist-container');
const playlistBtn = document.querySelector('.playlist-title');
const playlistSong = document.querySelector('.playlist-songs');
const songSum = document.getElementsByClassName('.song-summary');

// Tableau des titres des chansons
const songs = ['hey', 'summer', 'ukulele'];

// Numéro de chanson pour index
let songIndex = 2;

// Chargement intial des chansons dans le DOM
loadSong(songs[songIndex]);

// MàJ des détails de la chanson
function loadSong(song) {
  title.innerText = song;
  audio.src = `musiques/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
};

// Chargement initial de la playlist
loadPlaylist();

// Charger la playlist
function loadPlaylist() {
  songs.forEach(function (song) {
    const newPlaySongs = document.createElement('div');
    newPlaySongs.className = "song-summary";
    playlistSong.appendChild(newPlaySongs);
    newPlaySongs.innerText = song;
  });
};

// Si on lance lecture, on change l'icône bouton en "pause" et on lance l'animation CSS (.music-info + img) + musique
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
};

// Si on met en pause, on fait l'inverse de la fonction précédente
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');
  playBtn.querySelector('i.fas').classList.add('fa-play');

  audio.pause();
};

// Pour boutons précédent/suivant
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  } // Permet une boucle : si on arrive au début de la liste, repart de la dernière chanson de la liste

  loadSong(songs[songIndex]);

  playSong();
};

function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  } // Permet une boucle : si on arrive à la fin de la liste, repart du début de la liste

  loadSong(songs[songIndex]);

  playSong();
};

//Sélectionner une musique dans la playlist
function selectSong(e) {
  let source = e.srcElement.innerText;

  title.innerText = source;
  audio.src = `musiques/${source}.mp3`;
  cover.src = `images/${source}.jpg`;

  playSong();
}

// Pour barre de progression + compteur
function updateProgress(e) { // On capture l'event timeupdate, qui occure quand le temps actuel de la chanson change
  const { duration, currentTime } = e.srcElement; // (destructuration d'objets) On capture les propriétés duration (durée totale) et currentTime (durée actuelle) de l'élément source (la chanson) à chaque occurence de l'event
  const progressPercent = (currentTime / duration) * 100;

  progress.style.width = `${progressPercent}%`;

  const sec = parseInt(audio.currentTime % 60); // Pour afficher le temps courant/temps restant
  const min = parseInt((audio.currentTime / 60) % 60);
  const totalSec = parseInt(audio.duration % 60);
  const totalMin = parseInt((audio.duration / 60) % 60);

  if (sec < 10) {
    timer.innerText = `${min}:0${sec} / ${totalMin}:${totalSec}`;
  } else {
    timer.innerText = `${min}:${sec} / ${totalMin}:${totalSec}`;
  };
};

// Pour modifier progression
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration; // Opération similaire à la fonction précédente. On prend comme référentiel la position du click sur le music-container, divisé par la largeur de ce dernier, multiplié par la durée totale
};

// Pour ouvrir/fermer playlist
function openMenu() {
  const open = playlist.classList.contains('open');

  if (open) {
    playlist.classList.remove('open');
  } else {
    playlist.classList.add('open');
  };
};

// Event pour lecture de la musique, clic sur lecture
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play'); // Check si lecture en cours

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Events pour boutons précédent/suivant
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Event pour barre de progression
audio.addEventListener('timeupdate', updateProgress);

// Bouger la lecture de la chanson via la barre de progression
progressContainer.addEventListener('click', setProgress);

// Passer automatiquement à la chanson suivante quand une chanson est terminée
audio.addEventListener('ended', nextSong);

// Dérouler le menu playlist
playlistBtn.addEventListener('click', openMenu);

//Sélectionner une musique dans la playlist
playlistSong.addEventListener('click', selectSong);