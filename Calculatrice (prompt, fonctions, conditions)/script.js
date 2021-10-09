// ETAPE 1
let choix;
let premierNombre;
let deuxiemeNombre;
// Ces trois premières variables auraient aussi pu être déclarées en var
// à l'intérieur des boucles
let resultat;

// ETAPE 3
function addition() {
    resultat = premierNombre + deuxiemeNombre;
    return resultat;
}

function multiplication() {
    resultat = premierNombre * deuxiemeNombre;
    return resultat;
}

function soustraction() {
    resultat = premierNombre - deuxiemeNombre;
    return resultat;
}

function division() {
    resultat = premierNombre / deuxiemeNombre;
    if(deuxiemeNombre == 0) {
        alert("Attention ! Vous ne pouvez pas diviser par zéro !");        
    } else {
    return resultat;
    }
}

do {
    choix = prompt("Quel calcul souhaitez vous faire ?\n\n 1 - Addition\n 2 - Multiplication\n 3 - Soustraction\n 4 - Division\n");
} while(choix > 4 || choix == 0 || isNaN(choix) || choix == null)
// while(choix != 1 && choix != 2 && choix != 3 && choix != 4) fonctionne aussi, moins complexe

//ETAPE 2
do {
    premierNombre = Number(prompt("Veuillez choisir le premier nombre :"));
    deuxiemeNombre = Number(prompt("Veuillez choixir un deuxième nombre :"));
} while(isNaN(premierNombre) || isNaN(deuxiemeNombre))

// do {
//     premierNombre = prompt("Veuillez choisir le premier nombre :");
//     premierNombre = parseInt(premierNombre);
// } while(isNaN(premierNombre))

// do {
//     deuxiemeNombre = prompt("Veuillez choixir un deuxième nombre :");
//     deuxiemeNombre = parseInt(deuxiemeNombre);
// } while(isNaN(deuxiemeNombre))

// ETAPE 4
switch(choix) {
    case "1":
        addition();
        break;

    case "2":
        multiplication();
        break;

    case "3":
        soustraction();
        break;

    case "4":
        division();
        break;

    default:
        alert("Attention, il y a une erreur !");
}

alert("Voici le résultat : " + resultat);