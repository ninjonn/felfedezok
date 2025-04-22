/**
 * @callback AddExploreCallback
 * @param {Explore} felfedezes - Az újonnan hozzáadott felfedezés
 */

/**
 * @callback TableCallback
 * @param {Explore[]} felfedezesek - A megjelenítendő felfedezések listája
 */

/**
 * @callback ExploreFilterCallback
 * @param {Explore} felfedezes - A felfedezés, amit szűrni kell
 * @returns {boolean}
 */


/**
 * A `Manager` osztály felelős a felfedezések kezeléséért és a callback-ek kezeléséért
 */
class Manager {
    /**
     * @type {Explore[]} - A felfedezések tárolására szolgáló tömb
     * @private
     */
    #tomb;

    /**
     * @type {AddExploreCallback} - A callback függvény, amelyet új felfedezés hozzáadásakor hív meg
     * @private
     */
    #addExploreCallback;

    /**
     * @type {TableCallback} - A callback függvény, amelyet a táblázat betöltésekor hív meg
     */
    #renderTableCallback;

    /**
     * Létrehoz egy új `Manager` példányt
     */
    constructor() {
        this.#tomb = []; // Inicializálja a felfedezések tárolására szolgáló tömböt
    }

    /**
     * Beállítja az `AddExploreCallback` függvényt.
     * @param {AddExploreCallback} callback - A callback függvény, amelyet új felfedezés hozzáadásakor hív meg
     */
    setAddExploreCallback(callback) {
        this.#addExploreCallback = callback; // Beállítja a callback függvényt
    }

    /**
     * Beállítja a `TableCallback` függvényt.
     * @param {TableCallback} callback - A callback függvény, amelyet a táblázat betöltésekor hív meg
     */
    setRenderTableCallback(callback) {
        this.#renderTableCallback = callback; // Beállítja a callback függvényt
    }

    /**
     * Új felfedezést ad hozzá a tömbhöz, és meghívja a callback függvényt
     * @param {Explore} felfedezes - A hozzáadandó felfedezés objektum
     */
    addExplore(felfedezes) {
        this.#tomb.push(felfedezes); // Hozzáadja a felfedezést a tömbhöz
        this.#addExploreCallback(felfedezes); // Meghívja a callback függvényt
    }

    /**
     * @param {ExploreFilterCallback} callback
     */
    szuro(callback) {
        const eredmeny = [] // Létrehoz egy üres tömböt, amelybe a szűrt felfedezéseket tárolja
        for (const felfedezes of this.#tomb) { // Iterál a felfedezések tömbjén
            if (callback(felfedezes)) { // Ha a felfedezés megfelel a szűrési feltételnek
                eredmeny.push(felfedezes) // Hozzáadja a felfedezést az eredmény tömbhöz
            }
        }
        this.#renderTableCallback(eredmeny); // Meghívja a renderTableCallback függvényt az eredmény tömbbel
    }

    /**
     * A `letoltesTomb` metódus a felfedezések adatait CSV formátumban adja vissza.
     * @returns {string} - A felfedezések CSV formátumú szövege, amely tartalmazza a fejlécet és az adatokat.
     */
    letoltesTomb() {
        const eredmeny = ['nev;szolgalat;evszam;felfedezes']; // Létrehoz egy tömböt, amely tartalmazza a CSV fejlécet
        for (const felfedezes of this.#tomb) { // Végigiterál a privát tömbön, amely a felfedezéseket tárolja
            eredmeny.push(`${felfedezes.nev};${felfedezes.szolgalat};${felfedezes.evszam};${felfedezes.felfedezes}`); // Hozzáad egy új sort a tömbhöz, amely a felfedezés adatait tartalmazza pontosvesszővel elválasztva
        }
        return eredmeny.join('\n'); // A tömb elemeit egyetlen szöveggé alakítja, ahol a sorokat új sorral választja el
    }

    /**
     * @param {ExploreFilterCallback} callback
     * @returns {Explore[]}
     */
    szurtLista(callback) {
        return this.#tomb.filter(callback); // Visszaadja a szűrésnek megfelelő felfedezések listáját
    }
}