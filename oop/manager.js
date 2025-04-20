/**
 * A `Manager` osztály felelős a felfedezések kezeléséért és a callback-ek kezeléséért
 */
class Manager {
    /**
     * @type {Array<Object>} - A felfedezések tárolására szolgáló tömb
     * @private
     */
    #tomb;

    /**
     * @type {AddExploreCallback} - A callback függvény, amelyet új felfedezés hozzáadásakor hív meg
     * @private
     */
    #addExploreCallback;

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
     * Új felfedezést ad hozzá a tömbhöz, és meghívja a callback függvényt
     * @param {Object} felfedezes - A hozzáadandó felfedezés objektum
     */
    addExplore(felfedezes) {
        this.#tomb.push(felfedezes); // Hozzáadja a felfedezést a tömbhöz
        this.#addExploreCallback(felfedezes); // Meghívja a callback függvényt
    }

    /**
     * A `letoltesTomb` metódus a felfedezések adatait CSV formátumban adja vissza.
     * @returns {string} - A felfedezések CSV formátumú szövege, amely tartalmazza a fejlécet és az adatokat.
     */ 
    letoltesTomb(){
        const eredmeny = ['nev;szolgalat;evszam;felfedezes']; // Létrehoz egy tömböt, amely tartalmazza a CSV fejlécet
        for(const felfedezes of this.#tomb){ // Végigiterál a privát tömbön, amely a felfedezéseket tárolja
            eredmeny.push(`${felfedezes.nev};${felfedezes.szolgalat};${felfedezes.evszam};${felfedezes.felfedezes}`); // Hozzáad egy új sort a tömbhöz, amely a felfedezés adatait tartalmazza pontosvesszővel elválasztva
        }
        return eredmeny.join('\n'); // A tömb elemeit egyetlen szöveggé alakítja, ahol a sorokat új sorral választja el
    }
}