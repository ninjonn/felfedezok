/**
 * Az `Explore` osztály egy felfedezőt és annak felfedezését reprezentálja
 */
class Explore {
    /**
     * @type {string} - A felfedező neve
     * @private
     */
    #nev;

    /**
     * @type {string} - A felfedező szolgálata
     * @private
     */
    #szolgalat;

    /**
     * @type {number} - A felfedezés évszáma
     * @private
     */
    #evszam;

    /**
     * @type {string} - A felfedezés neve
     * @private
     */
    #felfedezes;

    /**
     * Létrehoz egy új `Explore` példányt
     * @param {string} nev - A felfedező neve
     * @param {string} szolgalat - A felfedező szolgálata
     * @param {number} evszam - A felfedezés évszáma
     * @param {string} felfedezes - A felfedezés neve
     */
    constructor(nev, szolgalat, evszam, felfedezes) {
        this.#nev = nev; // A felfedező neve
        this.#szolgalat = szolgalat; // A felfedező szolgálata
        this.#evszam = evszam; // A felfedező évszáma
        this.#felfedezes = felfedezes; // A felfedező neve
    }

    /**
     * @returns {string} - A felfedező neve
     */
    get nev() {
        return this.#nev; // A felfedező neve
    }

    /**
     * @returns {string} - A felfedező szolgálata
     */
    get szolgalat() {
        return this.#szolgalat; // A felfedező szolgálata
    }

    /**
     * @returns {number} - A felfedezés évszáma
     */
    get evszam() {
        return this.#evszam; // A felfedezés évszáma
    }

    /**
     * @returns {string} - A felfedezés neve
     */
    get felfedezes() {
        return this.#felfedezes; // A felfedezés neve
    }
}