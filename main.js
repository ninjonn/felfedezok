/**
 * Létrehoz egy új div elemet a megadott osztálynévvel
 * @param {string} osztalyNev - Az osztály neve, amelyet a létrehozott div elemhez rendelünk
 * @returns {HTMLDivElement} - A létrehozott div elem
 */
const csinalDiv = (osztalyNev) => {
    const div = document.createElement('div'); // Létrehoz egy új div HTML elemet
    div.className = osztalyNev; // Beállítja a létrehozott div 'class' attribútumát a megadott osztálynévre
    return div; // Visszaadja a létrehozott és beállított div elemet
}
const kontenerDiv = csinalDiv('container'); // Meghívjuk a csinalDiv függvényt 'container' osztálynévvel, és eltároljuk az eredményt kontenerDiv változóba
document.body.appendChild(kontenerDiv); // Hozzáadjuk a kontenerDiv-et az oldal body eleméhez
const tablaDiv = csinalDiv('table'); // Meghívjuk a csinalDiv függvényt 'table' osztálynévvel
const tablaSim = document.createElement('table'); // Létrehozunk egy új 'table' elemet
tablaDiv.appendChild(tablaSim); // Hozzáadjuk a tablaSim-t a tablaDiv-hez
const tablaFejlec = document.createElement('thead'); // Létrehozunk egy új 'thead' elemet, ami a táblázat fejlécét képviseli
tablaSim.appendChild(tablaFejlec); // Hozzáadjuk a 'thead' elemet a táblázathoz
const tablaFejSor =  document.createElement('tr'); // Létrehozunk egy új 'tr' elemet, ami a táblázat fejlécének sorát képviseli
tablaFejlec.appendChild(tablaFejSor) // Létrehozunk egy új 'tr' elemet, ami a táblázat fejlécének sorát képviseli
const theadCella = ['név', 'szolgálat', 'évszám', 'felfedezés']; // Létrehozunk egy tömböt, ami a fejléc celláinak tartalmát tárolja
for(const cellaTartalom of theadCella){ // Végigiterálunk a theadCella tömb elemein
    const thcella = document.createElement('th'); // Létrehozunk egy új 'th' elemet, ami a táblázat fejlécének cellája lesz
    thcella.innerText = cellaTartalom; // Beállítjuk a cella szövegét a cellaTartalom változó értékére
    tablaFejSor.appendChild(thcella); // Hozzáadjuk a cellát a fejléc sorhoz
}
const tablaTest = document.createElement('tbody'); // Létrehozunk egy új 'tbody' elemet
tablaSim.appendChild(tablaTest); // Hozzáadjuk a 'tbody' elemet a táblázathoz

const urlapDiv = csinalDiv('form'); // Ismét meghívjuk a makeDiv-et, ezúttal 'form' osztálynévvel, és eltároljuk az eredményt urlapDiv néven

kontenerDiv.appendChild(tablaDiv); // A konténer div-hez hozzáadjuk a tablaDiv-et
kontenerDiv.appendChild(urlapDiv); // A konténer div-hez hozzáadjuk az urlapDiv-et is
