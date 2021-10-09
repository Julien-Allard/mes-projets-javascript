let btn = document.querySelector('button');
let para = document.querySelector('p');
let hidden;
para.style.display = 'none';

btn.addEventListener('click', spoiler);

function spoiler() {
  if(hidden == true) {
    para.style.display = 'block';
    btn.textContent = "Cacher";
    hidden = false;
  }
  else {
    para.style.display = 'none';
    btn.textContent = "Afficher";
    hidden = true;
  }
}