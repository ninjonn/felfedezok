const csinalDiv = (osztalyNev) => { // Egy függvényt hozunk létre 'csinalDiv' néven, ami egy osztálynevet vár paraméterként
    const div = document.createElement('div'); // Létrehoz egy új div HTML elemet
    div.className = osztalyNev; // Beállítja a létrehozott div 'class' attribútumát a megadott osztálynévre
    return div; // Visszaadja a létrehozott és beállított div elemet
}
const kontenerDiv = csinalDiv('container'); // Meghívjuk a csinalDiv függvényt 'container' osztálynévvel, és eltároljuk az eredményt kontenerDiv változóba
document.body.appendChild(kontenerDiv); // Hozzáadjuk a kontenerDiv-et az oldal body eleméhez

const tablaDiv = csinalDiv('table'); // Meghívjuk a csinalDiv függvényt 'table' osztálynévvel
const urlapDiv = csinalDiv('form'); // Ismét meghívjuk a makeDiv-et, ezúttal 'form' osztálynévvel, és eltároljuk az eredményt urlapDiv néven

kontenerDiv.appendChild(tablaDiv); // A konténer div-hez hozzáadjuk a tablaDiv-et (mint gyermek elemet)
kontenerDiv.appendChild(urlapDiv); // A konténer div-hez hozzáadjuk az urlapDiv-et is (szintén mint gyermek elemet)
