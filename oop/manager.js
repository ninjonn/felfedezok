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
}