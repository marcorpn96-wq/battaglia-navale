const prompt = require("prompt-sync")();

const DIM = 5;

// matrice DIM x DIM piena di acqua
function creaGriglia() {
  const griglia = [];
  for (let indiceRiga = 0; indiceRiga < DIM; indiceRiga++) {
    const riga = [];
    for (let indiceColonna = 0; indiceColonna < DIM; indiceColonna++) {
      riga.push("~");
    }
    griglia.push(riga);
  }
  return griglia;
}

// stampa la griglia con le celle separate da uno spazio
function stampaCampo(griglia) {
  for (const riga of griglia) {
    console.log(riga.join(" "));
  }
}

// una coordinata è valida se è un intero tra 0 e DIM - 1
function coordinataValida(valore) {
  return Number.isInteger(valore) && valore >= 0 && valore < DIM;
}

const campo = creaGriglia(); // quello che vede il giocatore
const navi = creaGriglia();  // il segreto

// nave di 3 celle in posizione fissa: riga 2, colonne 1, 2 e 3
for (let indiceColonna = 1; indiceColonna <= 3; indiceColonna++) {
  navi[2][indiceColonna] = "N";
}

let colpi = 0;   // tutti i colpi validi sparati
let colpite = 0; // celle della nave colpite

stampaCampo(campo);

while (colpite < 3) {
  const rigaColpo = Number(prompt("Riga (0-4): "));
  const colonnaColpo = Number(prompt("Colonna (0-4): "));

  // controllo 1: coordinate dentro la griglia
  if (!coordinataValida(rigaColpo) || !coordinataValida(colonnaColpo)) {
    console.log("Coordinate fuori dalla griglia, riprova");
    continue;
  }

  // controllo 2: cella non ancora colpita
  if (campo[rigaColpo][colonnaColpo] !== "~") {
    console.log("Hai già sparato qui, riprova");
    continue;
  }

  colpi++;

  if (navi[rigaColpo][colonnaColpo] === "N") {
    console.log("Colpito!");
    campo[rigaColpo][colonnaColpo] = "X";
    colpite++;
  } else {
    console.log("Mancato!");
    campo[rigaColpo][colonnaColpo] = "O";
  }

  stampaCampo(campo);
}

console.log("Nave affondata in " + colpi + " colpi!");