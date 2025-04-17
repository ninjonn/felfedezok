/**
 * A `Terulet` osztály egy HTML elemet hoz létre és hozzáadja azt egy konténerhez.
 */
class Terulet { 
    /**
     * @type {HTMLDivElement}
     */
    #div; // A #div egy privát mező, amely a létrehozott div elemet tárolja

    /**
     * @returns {HTMLDivElement} - A létrehozott div elem
     */
    get div(){ // Getter metódus, amely visszaadja a #div mező értékét}
        return this.#div; // Visszaadja a privát #div mező értékét
    }

    /**
     * Létrehoz egy új `Terulet` példányt.
     * @param {string} osztalyNev - Az osztály neve, amelyet a létrehozott div elemhez rendelünk.
     */
    constructor(osztalyNev) { // Az osztály konstruktora, ami egy osztálynevet vár paraméterként
        let kontenerDiv = document.querySelector('.containeroop'); // Megpróbálunk megkeresni egy létező elemet, amelynek osztályneve 'containeroop'
        if (!kontenerDiv) { // Ha nem találunk ilyen elemet
            kontenerDiv = document.createElement('div'); // Létrehozunk egy új div elemet
            kontenerDiv.className = 'containeroop'; // Beállítjuk az új div 'class' attribútumát 'containeroop'-ra
            document.body.appendChild(kontenerDiv); // Hozzáadjuk a div-et a dokumentum body eleméhez
        }
        this.#div = document.createElement('div'); // Létrehozunk egy új div elemet
        this.#div.className = osztalyNev; // Beállítjuk a div osztályát a konstruktorban kapott paraméter alapján
        kontenerDiv.appendChild(this.#div); // Hozzáadjuk a létrehozott div-et a konténerhez
    }
}

/**
 * A `Urlap` osztály egy űrlapot hoz létre és hozzáadja a konténerhez.
 * @extends Terulet
 */
class Tablazat extends Terulet {
    /**
     * @type {HTMLTableElement}
     */
    constructor(cssOsztaly) { // A Tablazat osztály konstruktora, ami egy CSS osztálynevet vár paraméterként
        super(cssOsztaly); // Meghívja a szülő osztály konstruktorát, hogy létrehozza a div elemet
        const tabla = document.createElement('table'); // Létrehoz egy új 'table' elemet
        this.div.appendChild(tabla); // Hozzáadja a táblázatot a div-hez
        const tablaFejlec = document.createElement('thead'); // Létrehoz egy új 'thead' elemet, ami a táblázat fejlécét képviseli
        tabla.appendChild(tablaFejlec); // Hozzáadja a 'thead' elemet a táblázathoz
        const tablaFejSor = document.createElement('tr'); // Létrehoz egy új 'tr' elemet, ami a táblázat fejlécének sorát képviseli
        tablaFejlec.appendChild(tablaFejSor); // Hozzáadja a 'tr' elemet a fejléchez
        const tablaFejCella = ['név', 'szolgálat', 'évszám', 'felfedezés']; // Létrehozunk egy tömböt, ami a fejléc celláinak tartalmát tárolja
        for(const cellaTartalom of tablaFejCella){ // Végigiterálunk a fejléc celláinak tartalmán
            const thCella = document.createElement('th'); // Létrehozunk egy új 'th' elemet, ami a táblázat fejlécének cellája lesz
            thCella.innerText = cellaTartalom; // Beállítjuk a cella szövegét a cellaTartalom változó értékére
            tablaFejSor.appendChild(thCella); // Hozzáadjuk a cellát a fejléc sorhoz
        }
        const tablaTest = document.createElement('tbody'); // Létrehozunk egy új 'tbody' elemet, ami a táblázat törzsét képviseli
        tabla.appendChild(tablaTest); // Hozzáadjuk a 'tbody' elemet a táblázathoz
    }
}