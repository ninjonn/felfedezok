/**
 * @callback AddExploreCallback
 * @param {Explore} explore - Az új felfedezés
 */

/**
 * A `Terulet` osztály egy HTML elemet hoz létre és hozzáadja azt egy konténerhez.
 */
class Terulet {
    /**
     * @type {HTMLDivElement}
     */
    #div; // A #div egy privát mező, amely a létrehozott div elemet tárolja

    /**
     * @type {Manager}
    */
    #manager; // A #manager egy privát mező, amely a menedzsert tárolja

    /**
     * @returns {HTMLDivElement} - A létrehozott div elem
     */
    get div() { // Getter metódus, amely visszaadja a #div mező értékét
        return this.#div; // Visszaadja a privát #div mező értékét
    }

    /**
     * @returns {Manager} - A menedzser példány
    */
    get manager() { // Getter metódus, amely visszaadja a #manager mező értékét
        return this.#manager; // Visszaadja a privát #manager mező értékét
    }
    

    /**
     * Létrehoz egy új `Terulet` példányt.
     * @param {string} osztalyNev - Az osztály neve, amelyet a létrehozott div elemhez rendelünk.
     * @param {Manager} manager - A manager példány, amelyet a területhez rendelünk.
     */
    constructor(osztalyNev,manager) { // Az osztály konstruktora, ami egy osztálynevet vár paraméterként
        this.#manager = manager; // Inicializálja a #manager
        const kontener = this.#getKontenerDiv(); // Meghívja a privát #getKontenerDiv metódust, hogy megszerezze a konténer div-et
        this.#div = document.createElement('div'); // Létrehozunk egy új div elemet
        this.#div.className = osztalyNev; // Beállítjuk a div osztályát a konstruktorban kapott paraméter alapján
        kontener.appendChild(this.#div); // Hozzáadjuk a létrehozott div-et a konténerhez
        }

    /**
     * Privát metódus, amely visszaadja a konténer div-et.
     * @returns {HTMLDivElement} - A konténer div elem
    */
    #getKontenerDiv() { // Privát metódus, amely visszaadja a konténer div-et
        let kontenerDiv = document.querySelector('.containeroop'); // Megpróbálunk megkeresni egy létező elemet, amelynek osztályneve 'containeroop'
        if (!kontenerDiv) { // Ha nem találunk ilyen elemet
            kontenerDiv = document.createElement('div'); // Létrehozunk egy új div elemet
            kontenerDiv.className = 'containeroop'; // Beállítjuk az új div 'class' attribútumát 'containeroop'-ra
            document.body.appendChild(kontenerDiv); // Hozzáadjuk a div-et a dokumentum body eleméhez
        }
        return kontenerDiv; // Visszaadja a konténer div-et
    }
}

/**
 * A `Urlap` osztály egy űrlapot hoz létre és hozzáadja a konténerhez.
 * @extends Terulet
 */
class Tablazat extends Terulet {
    /**
     * Létrehoz egy új `Tablazat` példányt.
     * @param {string} cssOsztaly - A CSS osztály neve, amelyet a táblázathoz rendelünk.
     * @param {Manager} manager - A manager példány, amely a felfedezések kezeléséért felelős
     */
    constructor(cssOsztaly, manager) {
        super(cssOsztaly, manager); // Meghívja a szülő osztály konstruktorát
        const tablaTest = this.#createTabla(); // Létrehozza a táblázatot
        this.#setAddExploreCallback(tablaTest); // Beállítja az új felfedezés hozzáadásának callback függvényét 
        this.#setRenderTableCallback(tablaTest); // Beállítja a táblázat renderelésének callback függvényét
    }

    /**
     * Beállítja az új felfedezés hozzáadásának callback függvényét.
     * @param {HTMLTableSectionElement} tablaTest - A táblázat törzs elem
     * @type {AddExploreCallback} 
     */
    #setAddExploreCallback(tablaTest) {
        this.manager.setAddExploreCallback((exp) => { // Beállítja a callback függvényt, amelyet új felfedezés hozzáadásakor hív meg
            this.#createFelfedezesRow(exp, tablaTest); // Létrehozza a felfedezés sorát a táblázatban
        });
    }

    /**
     * @callback TableCallback
     * @param {Explore[]} tomb - A felfedezések tömbje
     */

    /**
     * Beállítja a táblázat renderelésének callback függvényét.
     * @param {HTMLTableSectionElement} tablaTest - A táblázat törzs elem
     */
    #setRenderTableCallback(tablaTest) {
        this.manager.setRenderTableCallback((tomb) => { 
            tablaTest.innerHTML = ''; // Törli a táblázat törzs tartalmát
            tomb.forEach(felfedezes => { // Végigiterál a felfedezések tömbjén
                this.#createFelfedezesRow(felfedezes, tablaTest); // Létrehozza a felfedezés sorát a táblázatban
            });
        });
    }

    /**
     * Létrehozza a felfedezés sorát a táblázatban.
     * @param {Explore} felfedezes - A felfedezés objektum
     * @param {HTMLTableSectionElement} tablaTest - A táblázat törzs elem
     */
    #createFelfedezesRow(felfedezes, tableTest) {
        const sor = document.createElement('tr'); // Létrehoz egy új sor elemet a táblázatban
        ['nev', 'szolgalat', 'evszam', 'felfedezes'].forEach((kulcs) => { // Végigiterál a felfedezés kulcsain 
            const cella = document.createElement('td'); // Létrehoz egy új cella elemet a táblázatban
            cella.textContent = felfedezes[kulcs]; // Beállítja a cella szövegét a felfedezés kulcsának értékére
            sor.appendChild(cella); // Hozzáadja a cellát a sorhoz 
        });
        tableTest.appendChild(sor); // Hozzáadja a sort a táblázat törzséhez 
    }

    /**
     * Létrehozza a táblázatot és visszaadja a táblázat törzs elemét.
     * @returns {HTMLTableSectionElement} - A táblázat törzs elem
     */
    #createTabla() {
        const tabla = document.createElement('table'); // Létrehoz egy új táblázat elemet
        this.div.appendChild(tabla); // Hozzáadja a táblázatot a div-hez
        const tablaFejlec = document.createElement('thead'); // Létrehoz egy új táblázat fejléc elemet
        tabla.appendChild(tablaFejlec); // Hozzáadja a fejlécet a táblázathoz
        const tablaFejSor = document.createElement('tr'); // Létrehoz egy új fejléc sort
        tablaFejlec.appendChild(tablaFejSor); // Hozzáadja a fejléc sort a fejléchez
        ['Név', 'Szolgálat', 'Évszám', 'Felfedezés'].forEach(cimke => { // Végigiterál a fejléc címkéin
            const thCella = document.createElement('th'); // Létrehoz egy új fejléc cellát
            thCella.innerText = cimke; // Beállítja a fejléc cella szövegét
            tablaFejSor.appendChild(thCella); // Hozzáadja a fejléc cellát a fejléc sorhoz
        });
        const tablaTest = document.createElement('tbody'); // Létrehoz egy új táblázat törzs elemet
        tabla.appendChild(tablaTest); // Hozzáadja a törzset a táblázathoz
        return tablaTest; // Visszaadja a táblázat törzs elemét
    }
}

/**
 * A `Urlap` osztály egy űrlapot hoz létre és hozzáadja a konténerhez.
 * @extends Terulet
 */
class Urlap extends Terulet {
    /**
     * @type {Array<UrlapMezo>} - A bemeneti mezők tömbje
     * @private
     */
    #urlapMezoTomb; // A #urlapMezoTomb egy privát mező, amely a bemeneti mezőket tárolja

    /**
     * * Létrehoz egy új `Urlap` példányt.
     * @param {string} cssOsztaly - A CSS osztály neve, amelyet az űrlaphoz rendelünk.
     * @param {Array<string>} mezoLista - A bemeneti mezők listája, amely tartalmazza az azonosítót és a címkét.
     * @param {Manager} manager - A manager példány, amely a felfedezések kezeléséért felelős
     */
    constructor(cssOsztaly, mezoLista, manager) {
        super(cssOsztaly, manager); // Meghívja a szülő osztály konstruktorát
        this.#urlapMezoTomb = []; // Inicializálja a #urlapMezoTomb tömböt
        this.#createUrlap(mezoLista); // Létrehozza az űrlapot a megadott mezőlistával
        this.#setSubmitEventListener(); // Beállítja az eseménykezelőt az űrlap elküldésére
    }

    /**
     * Létrehozza az űrlapot a megadott mezőlistával.
     * @param {Array<string>} mezoLista - A mezőlista, amely tartalmazza az azonosítót és a címkét.
     */
    #createUrlap(mezoLista) {
        const urlap = document.createElement('form'); // Létrehoz egy új űrlap elemet
        this.div.appendChild(urlap); // Hozzáadja az űrlapot a div-hez
        mezoLista.forEach((mezoElem) => { // Végigiterál a mezőlistán
            const mezo = new UrlapMezo(mezoElem.mezoid, mezoElem.mezocimke); // Létrehozza a mezőt az azonosító és a címke alapján
            this.#urlapMezoTomb.push(mezo); // Hozzáadja a mezőt a mező tömbhöz
            urlap.appendChild(mezo.divMeghiv()); // Hozzáadja a mezőt az űrlaphoz
        });
        const gomb = document.createElement('button'); // Létrehoz egy új gomb elemet az űrlaphoz
        gomb.textContent = 'Hozzáadás'; // A gomb szövege
        urlap.appendChild(gomb); // Hozzáadja a gombot az űrlaphoz
    }

    /**
     * Beállítja az eseménykezelőt az űrlap elküldésére.
     * @returns {EventListener}
     */
    #setSubmitEventListener() {
        const urlap = this.div.querySelector('form'); // Megkeresi az űrlap elemet a div-ben
        /**
         * Eseménykezelő az űrlap elküldésére.
         * @param {Event} e - Az esemény objektum
         * @returns {EventListener}
         */
        urlap.addEventListener('submit', (e) => { 
            e.preventDefault(); // Megakadályozza az űrlap alapértelmezett elküldését
            this.#submitUrlap(); // Meghívja a #submitUrlap metódust az űrlap elküldésekor
        });
    }

    /**
     * Ellenőrzi az űrlap mezőit, és ha minden mező helyes, hozzáad egy új felfedezést a menedzserhez.
     */
    #submitUrlap() {
        const ertekObject = {}; // Inicializál egy üres objektumot, amelybe a mezők értékeit tárolja
        let mutat = true; // Inicializálja a mutat változót igazra, hogy ellenőrizze, hogy minden mező helyes-e
        this.#urlapMezoTomb.forEach(bemenetiMezo => { // Végigiterál a bemeneti mezők tömbjén
            bemenetiMezo.hiba = ''; // Törli a hibaüzenetet
            if (bemenetiMezo.ertek === '') { // Ha a bemeneti mező értéke üres
                bemenetiMezo.hiba = 'Kötelező mező'; // Beállítja a hibaüzenetet
                mutat = false; // Beállítja a mutat változót hamisra, hogy jelezze, hogy nem minden mező helyes
            } else { // Ha a bemeneti mező értéke nem üres 
                ertekObject[bemenetiMezo.id] = bemenetiMezo.ertek; // Hozzáadja a mező értékét az objektumhoz a mező azonosítója alapján 
            }
        });

        if (mutat) { // Ha minden mező helyes 
            const explore = new Explore(ertekObject.nev, ertekObject.szolgalat, Number(ertekObject.evszam), ertekObject.felfedezes); // Létrehozza a felfedezést az objektumból
            this.manager.addExplore(explore); // Hozzáadja a felfedezést a menedzserhez 
        }
    }
}

/**
 * A `Feltoltes` osztály egy fájl feltöltésére szolgáló elemet hoz létre.
 * @extends Terulet
 */
class FeltoltesLetoltes extends Terulet {
    /**
     * Létrehoz egy új `Feltoltes` példányt.
     * @param {string} cssClass - A CSS osztály neve, amelyet a fájl feltöltéséhez rendelünk.
     * @param {Manager} manager - A manager példány, amely a felfedezések kezeléséért felelős
     */
    constructor(cssClass, manager) {
        super(cssClass, manager); // Meghívja a szülő osztály konstruktorát
        this.#createFajlBemenet(); // Létrehozza a fájl bemeneti elemet
        this.#setFajlKezeloListener(); // Beállítja a fájl kiválasztásának eseménykezelőjét 
        this.#setDownloadListener(); // Beállítja a fájl letöltésének eseménykezelőjét
    }

    /**
     * Létrehozza a fájl bemeneti elemet.
     * @returns {HTMLInputElement} - A fájl bemeneti elem
     */
    #createFajlBemenet() {
        const bemenet = document.createElement('input'); // Létrehoz egy új fájl bemeneti elemet
        bemenet.id = 'fajlinput'; // Beállítja a bemeneti elem azonosítóját
        bemenet.type = 'file'; // A bemeneti elem típusa fájl
        this.div.appendChild(bemenet); // Hozzáadja a bemeneti elemet a div-hez
    }

    /**
     * Beállítja a fájl kiválasztásának eseménykezelőjét.
     * @returns {EventListener}
     */
    #setFajlKezeloListener() {
        const bemenet = this.div.querySelector('#fajlinput'); // Megkeresi a fájl bemeneti elemet a div-ben
        /**
         * Eseménykezelő a fájl kiválasztására.
         * @param {Event} e - Az esemény objektum
         * @returns {EventListener}
         */ 
        bemenet.addEventListener('change', (e) => {
            this.#fajlKezelo(e); // Meghívja a fájl kiválasztásának eseménykezelőjét
        });
    }

    /**
     * Feldolgozza a fájl kiválasztását és hozzáadja a felfedezéseket a menedzserhez.
     * @param {Event} e - Az esemény objektum
     * @returns {EventListener}
     */
    #fajlKezelo(e) {
        const fajl = e.target.files[0]; // Megkapja a kiválasztott fájlt
        const fajlBeolvaso = new FileReader(); // Létrehoz egy új FileReader objektumot
        fajlBeolvaso.onload = () => { // Eseménykezelő, amely akkor hívódik meg, amikor a fájl beolvasása befejeződik
            const fajlSorok = fajlBeolvaso.result.split('\n').slice(1); // A fájl tartalmát sorokra bontja és eltávolítja az első sort
            fajlSorok.forEach(sor => { // Végigiterál a fájl sorain
                const mezok = sor.trim().split(';'); // A sorokat mezőkre bontja
                const felfedezes = new Explore(mezok[0], mezok[1], Number(mezok[2]), mezok[3]); // Létrehozza a felfedezést a mezők alapján
                this.manager.addExplore(felfedezes); // Hozzáadja a felfedezést a menedzserhez
            });
        };
        fajlBeolvaso.readAsText(fajl); // Beolvassa a fájlt szövegként
    }

    /**
     * Beállítja a fájl letöltésének eseménykezelőjét.
     * @returns {EventListener}
     */
    #setDownloadListener() {
        const letoltesGomb = document.createElement('button'); // Létrehoz egy új gomb elemet a fájl letöltéséhez
        letoltesGomb.textContent = 'Letöltés'; // A gomb szövege 
        this.div.appendChild(letoltesGomb); // Hozzáadja a gombot a div-hez
        /**
         * Eseménykezelő a fájl letöltésére.
         * @param {Event} e - Az esemény objektum
         * @returns {EventListener}
         */
        letoltesGomb.addEventListener('click', () => {
            this.#letoltesKezelo(); // Meghívja a fájl letöltésének eseménykezelőjét
        });
    }

    /**
     * Feldolgozza a fájl letöltését és létrehozza a letöltési linket.
     * @returns {EventListener}
     */
    #letoltesKezelo() {
        const link = document.createElement('a'); // Létrehoz egy új hivatkozás elemet a fájl letöltéséhez
        const tartalom = this.manager.letoltesTomb(); // Megkapja a letöltendő fájl tartalmát a menedzsertől
        const fajl = new Blob([tartalom], { type: 'text/csv' }); // Létrehoz egy új Blob objektumot a fájl tartalmával és típusával 
        link.href = URL.createObjectURL(fajl); // Létrehozza a fájl URL-jét
        link.download = 'newdata.csv'; // Beállítja a letöltési fájl nevét
        link.click(); // Kattint a hivatkozásra, hogy letöltse a fájlt
        URL.revokeObjectURL(link.href); // Visszavonja az URL-t, hogy felszabadítsa a memóriát
    }
}


/**
 * A `UrlapMezo` osztály egy űrlap mezőt reprezentál, amely tartalmaz egy címkét, egy bemeneti mezőt és egy hibaüzenetet.
 */
class UrlapMezo {
    /**
     * @type {string}
     */
    #id; // A #id egy privát mező, amely a mező azonosítóját tárolja

    /** 
     * @type {HTMLInputElement}
     */
    #bemenetiMezo; // A #bemenetiMezo egy privát mező, amely a bemeneti mezőt tárolja

    /**
     * @type {HTMLLabelElement}
     */
    #cimkeElem; // A #cimkeElem egy privát mező, amely a címkét tárolja

    /**
     * @type {HTMLSpanElement}
     */
    #hibaElem; // A #hibaElem egy privát mező, amely a hibaüzenetet tárolja

    /**
     * @returns {string} - A mező azonosítója
     */
    get id() {
        return this.#id; // Getter metódus, amely visszaadja a #id mező értékét
    }

    /**
     * @returns {HTMLInputElement} - A bemeneti mező
     */
    get ertek() {
        return this.#bemenetiMezo.value; // Getter metódus, amely visszaadja a bemeneti mező értékét
    }

    /**
     * @returns {HTMLLabelElement} - A címke elem
     */
    set hiba(ertek) {
        this.#hibaElem.textContent = ertek; // Setter metódus, amely beállítja a hibaüzenetet
    }

    /**
     * Létrehoz egy új `UrlapMezo` példányt.
     * @param {string} id - A mező azonosítója.
     * @param {string} cimkeTartalom - A mező címkéje.
     */
    constructor(id, cimkeTartalom) { // Az osztály konstruktora, ami egy azonosítót és egy címkét vár paraméterként
        this.#id = id; // Inicializálja a #id mezőt
        this.#cimkeElem = document.createElement('label'); // Létrehoz egy új 'label' elemet
        this.#cimkeElem.htmlFor = id; // Beállítja a címke htmlFor attribútumát a mező azonosítójára
        this.#cimkeElem.textContent = cimkeTartalom; // Beállítja a címke szövegét a mező címkéjére
        this.#bemenetiMezo = document.createElement('input'); // Létrehoz egy új 'input' elemet
        this.#bemenetiMezo.id = id; // Beállítja az input azonosítóját a mező azonosítójára
        this.#hibaElem = document.createElement('span'); // Létrehoz egy új 'span' elemet, ami a hibaüzenetet fogja tárolni
        this.#hibaElem.className = 'hiba'; // Beállítja a hibaüzenet osztályát 'hiba'-ra
    }

    /**
     * Létrehoz egy új div elemet, amely tartalmazza a címkét, a bemeneti mezőt és a hibaüzenetet.
     * @returns {HTMLDivElement} - A létrehozott div elem
     */
    divMeghiv() {
        const div = csinalDiv('field'); // Meghívja a csinalDiv függvényt 'field' osztálynévvel, és eltárolja az eredményt div néven
        const br1 = document.createElement('br') // Létrehoz egy új 'br' elemet, hogy új sort hozzon létre
        const br2 = document.createElement('br') // Létrehoz egy új 'br' elemet, hogy új sort hozzon létre
        const htmlElemek = [this.#cimkeElem, br1, this.#bemenetiMezo, br2, this.#hibaElem]; // Létrehoz egy tömböt, amely tartalmazza a címkét, a bemeneti mezőt és a hibaüzenetet
        for (const elem of htmlElemek) { // Végigiterál a htmlElemek tömb elemein
            div.appendChild(elem);  // Hozzáadja az elemeket a div-hez
        }
        return div; // Visszaadja a létrehozott div elemet
    }
}