/**
 * Szűrő osztály, amely a Terulet osztályból származik.
 * Ez az osztály felelős a felfedezések szűréséért és a szűrési feltételek megadásáért.
 * @extends Terulet
 */
class Szuro extends Terulet {
    /**
     * Létrehoz egy új Szuro példányt.
     * @param {string} cssclass - A CSS osztály neve, amelyet a szűrő elemhez rendelünk
     * @param {Manager} manager - A Manager példány, amely a felfedezések kezeléséért felelős
     */
    constructor(cssclass, manager) { 
        super(cssclass, manager); // Meghívja a szülő osztály konstruktorát
        const urlap = document.createElement('form'); // Létrehoz egy új űrlap elemet
        this.div.appendChild(urlap); // Hozzáadja az űrlapot a szűrő elemhez

        const nevBemenet = document.createElement('input'); // Létrehoz egy új bemeneti elemet a név szűréséhez
        nevBemenet.type = 'text'; // A bemeneti elem típusa szöveg
        nevBemenet.placeholder = 'Név alapján'; // A bemeneti elem helyőrző szövege
        nevBemenet.id = 'nevSzuro'; // Azonosító a bemeneti elemhez
        urlap.appendChild(nevBemenet); // Hozzáadja a bemeneti elemet az űrlaphoz

        const select = document.createElement('select'); // Létrehoz egy új legördülő menü elemet a szolgálat szűréséhez
        urlap.appendChild(select); // Hozzáadja a legördülő menüt az űrlaphoz
        const opciok = [ // Szolgálatok listája
            { value: '', innerText: 'üres' }, // Üres érték a legördülő menüben
            { value: 'angol', innerText: 'angol' }, 
            { value: 'portugal', innerText: 'portugál' },
            { value: 'spanyol', innerText: 'spanyol' }
        ];
        for (const opc of opciok) { // Végigiterál a szolgálatok listáján
            const opcioElem = document.createElement('option'); // Létrehoz egy új opció elemet a legördülő menüben
            opcioElem.value = opc.value; // Beállítja az opció értékét
            opcioElem.innerText = opc.innerText; // Beállítja az opció szövegét
            select.appendChild(opcioElem); // Hozzáad az opciót a legördülő menühöz
        }

        const gomb = document.createElement('button'); // Létrehoz egy új gomb elemet a szűréshez
        gomb.type = 'submit'; // A gomb típusa küldés
        gomb.innerText = 'Szűrés'; // A gomb szövege 
        urlap.appendChild(gomb); // Hozzáadja a gombot az űrlaphoz

        const eredmenyDiv = document.createElement('div'); // Létrehoz egy új div elemet az eredmények megjelenítéséhez
        eredmenyDiv.classList.add('result'); // CSS osztály hozzáadása az eredmény divhez
        this.div.appendChild(eredmenyDiv); // Hozzáadja az eredmény divet a szűrő elemhez

        /**
         * Eseménykezelő a szűrő űrlap elküldésére.
         * @param {Event} e - Az esemény objektum
         * @returns {EventListener}
         */
        urlap.addEventListener('submit', (e) => {
            e.preventDefault(); // Megakadályozza az űrlap alapértelmezett elküldését

            const nevErtek = nevBemenet.value.trim().toLowerCase(); // A név szűrési értéke, kisbetűs formában és eltávolítva a felesleges szóközöket
            const kivalasztottSzolgalat = select.value; // A kiválasztott szolgálat értéke a legördülő menüből

            const egyezesek = this.manager.szuro((item) => { // Szűrési feltétel megadása a szűrt lista metódusban 
                const nevEgyezes = nevErtek ? item.nev.toLowerCase().includes(nevErtek) : true; // Ellenőrzi, hogy a név tartalmazza-e a megadott értéket 
                const szolgalatEgyezes = kivalasztottSzolgalat ? item.szolgalat === kivalasztottSzolgalat : true; // Ellenőrzi, hogy a szolgálat megegyezik-e a kiválasztott értékkel 
                return nevEgyezes && szolgalatEgyezes; // Visszaadja az egyezést, ha mindkét feltétel teljesül
            });

            eredmenyDiv.innerText = `A feltételnek megfelelő elemek száma: ${egyezesek.length}`; // Megjeleníti az eredmény divben a szűrési feltételnek megfelelő elemek számát
        });
    }
}
