// ============================================================
// BATTAGLIA NAVALE nel terminale
// Una nave orizzontale di 3 celle nascosta in una griglia 5x5.
// Il giocatore ha al massimo 15 colpi per affondarla.
//
// Legenda della griglia:
//   ~  acqua non ancora esplorata
//   N  nave (il giocatore non la vede)
//   X  colpito
//   O  mancato
//
// Prima di eseguire: npm install prompt-sync
// ============================================================

const prompt = require("prompt-sync")( { sigint: true});

// COSTANTI
const DIM = 5;  // lato della griglia (5x5)
const LUNGHEZZA_NAVE = 3;  // celle occupate dalla nave
const MAX_COLPI = 15;   // colpi validi a disposizione

// FUNZIONI
// Crea una matrice DIM x DIM piena di acqua ("~")
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

// Stampa la griglia con le celle separate da uno spazio
function stampaCampo(griglia) {
  for (const riga of griglia) {
    console.log(riga.join(" "));
  }
}

// Una coordinata è valida se è un intero tra 0 e DIM - 1
// (Number("abc") dà NaN, che non è un intero: viene scartato)
function coordinataValida(valore) {
  return Number.isInteger(valore) && valore >= 0 && valore < DIM;
}

// PREPARAZIONE DELLA PARTITA
const campo = creaGriglia(); // quello che vede il giocatore
const navi = creaGriglia(); // il segreto: contiene la nave

// Piazza la nave in orizzontale, in posizione casuale e tutta dentro la griglia.
// La riga va da 0 a DIM - 1; la colonna di partenza solo da 0 a DIM - LUNGHEZZA_NAVE,
// altrimenti la nave uscirebbe dalla griglia.
const rigaNave = Math.floor(Math.random() * DIM);
const colonnaNave = Math.floor(Math.random() * (DIM - LUNGHEZZA_NAVE + 1));

for (let indiceCella = 0; indiceCella < LUNGHEZZA_NAVE; indiceCella++) {
  navi[rigaNave][colonnaNave + indiceCella] = "N";
}

// Contatori della partita
let colpi = 0;   // colpi validi sparati
let colpite = 0; // celle della nave colpite

// Mostra il campo iniziale, tutto acqua
stampaCampo(campo);

// CICLO DI GIOCO
// Si continua finché la nave non è affondata E restano colpi
while (colpite < LUNGHEZZA_NAVE && colpi < MAX_COLPI) {
  // Chiede il colpo al giocatore
  const rigaColpo = Number(prompt("Riga (0-4): "));
  const colonnaColpo = Number(prompt("Colonna (0-4): "));

  // Colpo non valido: coordinate fuori dalla griglia (non conta come colpo)
  if (!coordinataValida(rigaColpo) || !coordinataValida(colonnaColpo)) {
    console.log("Coordinate fuori dalla griglia, riprova");
    continue;
  }

  // Colpo non valido: cella già colpita (non conta come colpo)
  if (campo[rigaColpo][colonnaColpo] !== "~") {
    console.log("Hai già sparato qui, riprova");
    continue;
  }

  // Da qui il colpo è valido e viene contato
  colpi++;

  // Controlla nella griglia segreta se c'è la nave
  if (navi[rigaColpo][colonnaColpo] === "N") {
    console.log("Colpito!");
    campo[rigaColpo][colonnaColpo] = "X";
    colpite++;
  } else {
    console.log("Mancato!");
    campo[rigaColpo][colonnaColpo] = "O";
  }

  // Dopo ogni colpo: colpi rimasti e campo aggiornato
  console.log("Colpi rimasti: " + (MAX_COLPI - colpi));
  stampaCampo(campo);
}

// FINE PARTITA
// Si controlla colpite (e non i colpi rimasti): così affondare
// la nave con il quindicesimo colpo conta come vittoria
if (colpite === LUNGHEZZA_NAVE) {
  console.log("Nave affondata in " + colpi + " colpi!");
} else {
  console.log("");
  console.log("Hai perso! La nave era qui:");
  stampaCampo(navi);
}