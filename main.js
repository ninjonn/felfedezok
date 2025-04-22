const tomb = [] // Létrehozunk egy tömböt, ami a táblázat adatait tárolja

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

/**
 * Szűrő függvény, amely egy tömböt és egy callback függvényt vár
 * @param {Array} felfedezesTomb - A tömb, amelyet szűrni szeretnénk
 * @param {Function} callback - A callback függvény, amely meghatározza a szűrés feltételeit
 * @returns {Array} - A szűrt tömb
 */
const szuro = (felfedezesTomb, callback) => { // Létrehoz egy új tömböt, ami a szűrt elemeket tárolja
    const eredmeny = []; // Létrehoz egy új üres tömböt, ami a szűrt elemeket tárolja
    for(const elem of felfedezesTomb){ // Végigiterál a felfedezesTomb tömb elemein
        if(callback(elem)){ // Ha a callback függvény igaz értéket ad vissza az elemre
            eredmeny.push(elem); // Hozzáadja az elemet az eredmény tömbhöz
        }
    }
    return eredmeny; // Visszaadja a szűrt elemeket tartalmazó tömböt
}

const kontenerDiv = csinalDiv('container'); // Meghívjuk a csinalDiv függvényt 'container' osztálynévvel, és eltároljuk az eredményt kontenerDiv változóba
document.body.appendChild(kontenerDiv); // Hozzáadjuk a kontenerDiv-et az oldal body eleméhez

/**
 * Létrehoz egy új fájl feltöltő elemet
 * @returns {void}
 */
const createFileUpload = () => {
    const fajlInput = document.createElement('input'); // Létrehoz egy új input elemet
    fajlInput.type = 'file';  // Beállítja az input típusát 'file'-ra
    fajlInput.id = 'fajlInput'; // Beállítja az input id-ját 'fajlInput'-ra
    kontenerDiv.appendChild(fajlInput); // Hozzáadja a fajlInput elemet a kontenerDiv-hez

    /**
     * Fájl kiválasztásakor végrehajtandó művelet
     * @param {Event} e - Az esemény objektum
     * @returns {EventListener}
     */
    fajlInput.addEventListener('change', e => {
        const fajl = e.target.files[0]; // Kiválasztott fájl
        const reader = new FileReader(); // Létrehoz egy új FileReader objektumot
        reader.onload = () => { // Amikor a fájl betöltődött
            const sorok = reader.result.split('\n').slice(1); // A fájl tartalmát sorokra bontja, és eltávolítja az első sort
            sorok.forEach(sor => { // Végigiterál a sorokon
                const mezok = sor.trim().split(';'); // A sorokat mezőkre bontja
                const obj = { // Létrehoz egy új objektumot a mezők alapján
                    nev: mezok[0].trim(),
                    szolgalat: mezok[1].trim(),
                    evszam: mezok[2].trim(),
                    felfedezes: mezok[3].trim()
                };
                tomb.push(obj); // Hozzáadja az objektumot a tomb tömbhöz
                const tr = document.createElement('tr'); // Létrehoz egy új sor elemet
                /**
                 * Végigiterál az objektum értékein, és létrehoz egy új cellát minden értékhez
                 */
                Object.values(obj).forEach(ertek => { 
                    const td = document.createElement('td'); // Létrehoz egy új cella elemet
                    td.textContent = ertek; // Beállítja a cella szövegét az értékre
                    tr.appendChild(td); // Hozzáadja a cellát a sorhoz
                });
                tablaTest.appendChild(tr); // Hozzáadja a sort a táblázathoz
            });
        };
        reader.readAsText(fajl); // Betölti a fájlt szövegként
    });
};

/**
 * Létrehoz egy fájl letöltő elemet
 * @returns {void}
 */
const createFileDownload = () => {
    const letoltesGomb = document.createElement('button'); // Létrehoz egy új gomb elemet
    letoltesGomb.textContent = 'Letöltés'; // Beállítja a gomb szövegét 'Letöltés'-re
    kontenerDiv.appendChild(letoltesGomb); // Hozzáadja a letoltesGomb elemet a kontenerDiv-hez

    /**
     * Gomb megnyomásakor végrehajtandó művelet
     * @param {Event} e - Az esemény objektum
     * @returns {EventListener}
     */
    letoltesGomb.addEventListener('click', () => {
        const tartalomTomb = ['nev;szolgalat;evszam;felfedezes']; // Létrehoz egy új tömböt, ami a letöltendő fájl tartalmát tárolja
        tomb.forEach(felfedezes => { // Végigiterál a tomb tömb elemein
            tartalomTomb.push( // Hozzáadja a felfedezés adatait a tartalomTomb tömbhöz
                `${felfedezes.nev};${felfedezes.szolgalat};${felfedezes.evszam};${felfedezes.felfedezes}` // A felfedezés adatait pontosvesszővel elválasztva tárolja
            );
        });
        const blob = new Blob([tartalomTomb.join('\n')], { type: 'text/csv' }); // Létrehoz egy új Blob objektumot a tartalomTomb tömbből, és beállítja a típusát 'text/csv'-re
        const link = document.createElement('a'); // Létrehoz egy új hivatkozás elemet
        link.href = URL.createObjectURL(blob); // Beállítja a hivatkozás href attribútumát a Blob objektum URL-jére
        link.download = 'newdata.csv'; // Beállítja a hivatkozás letöltési nevét 'newdata.csv'-re
        link.click(); // Kattint a hivatkozásra, hogy letöltse a fájlt
        URL.revokeObjectURL(link.href); // Visszavonja a Blob objektum URL-jét, hogy felszabadítsa a memóriát
    });
};

/**
 * Létrehoz egy új táblázatot
 * @returns {HTMLTableSectionElement} - A létrehozott táblázat testét tartalmazó elem
 */
const createTable = () => {
    const tablaDiv = csinalDiv('table'); // Létrehoz egy új div elemet 'table' osztálynévvel
    const tablaSim = document.createElement('table'); // Létrehoz egy új táblázat elemet
    const tablaFejlec = document.createElement('thead'); // Létrehoz egy új táblázat fejléc elemet
    const tablaFejSor = document.createElement('tr'); // Létrehoz egy új táblázat fejléc sort
    const theadCella = ['név', 'szolgálat', 'évszám', 'felfedezés']; // Létrehoz egy tömböt, ami a fejléc celláit tárolja

    theadCella.forEach(cellaTartalom => { // Végigiterál a fejléc celláin
        const th = document.createElement('th'); // Létrehoz egy új fejléc cella elemet
        th.innerText = cellaTartalom; // Beállítja a fejléc cella szövegét
        tablaFejSor.appendChild(th); // Hozzáadja a fejléc cellát a fejléc sorhoz
    });

    tablaFejlec.appendChild(tablaFejSor); // Hozzáadja a fejléc sort a fejléc elemhez
    const tablaTest = document.createElement('tbody'); // Létrehoz egy új táblázat test elemet

    tablaSim.appendChild(tablaFejlec); // Hozzáadja a fejlécet a táblázathoz
    tablaSim.appendChild(tablaTest); // Hozzáadja a táblázat testet a táblázathoz
    tablaDiv.appendChild(tablaSim); // Hozzáadja a táblázatot a div elemhez
    kontenerDiv.appendChild(tablaDiv); // Hozzáadja a div elemet a kontenerDiv-hez

    return tablaTest; // Visszaadja a táblázat testét
};

const tablaTest = createTable(); // Meghívja a createTable függvényt, és eltárolja az eredményt tablaTest változóba

/**
 * Létrehoz egy új űrlapot
 * @returns {HTMLFormElement} - A létrehozott űrlap elemet
 */
const createForm = () => {
    const urlapDiv = csinalDiv('form'); // Létrehoz egy új div elemet 'form' osztálynévvel
    const urlapSim = document.createElement('form'); // Létrehoz egy új űrlap elemet
    const mezoLista = [ // Létrehoz egy tömböt, ami a mezők adatait tárolja
        { mezoid: 'nev', mezocimke: 'név' }, // A nev mező azonosítója és címkéje
        { mezoid: 'szolgalat', mezocimke: 'szolgálat' }, // A szolgalat  mező azonosítója és címkéje
        { mezoid: 'evszam', mezocimke: 'évszám' }, // A evszam mező azonosítója és címkéje
        { mezoid: 'felfedezes', mezocimke: 'felfedezés' } // A felfedezes mező azonosítója és címkéje
    ];

    mezoLista.forEach(({ mezoid, mezocimke }) => { // Végigiterál a mezőlistán
        const mezo = csinalDiv('field'); // Létrehoz egy új div elemet 'field' osztálynévvel
        const cimke = document.createElement('label'); // Létrehoz egy új címke elemet
        cimke.htmlFor = mezoid; // Beállítja a címke htmlFor attribútumát a mező azonosítójára
        cimke.textContent = mezocimke; // Beállítja a címke szövegét a mező címkéjére

        const input = document.createElement('input'); // Létrehoz egy új input elemet
        input.id = mezoid; // Beállítja az input id-ját a mező azonosítójára

        const hiba = document.createElement('span'); // Létrehoz egy új span elemet
        hiba.className = 'hiba'; // Beállítja a span osztályát 'hiba'-ra

        mezo.append(cimke, document.createElement('br'), input, // Hozzáadja a címkét, egy sortörést, az input mezőt és a hibát a mezőhöz
                    document.createElement('br'), hiba); // Hozzáad egy új sortörést és a hibát a mezőhöz
        urlapSim.appendChild(mezo); // Hozzáadja a mezőt az űrlaphoz
    });

    const gombUrlap = document.createElement('button'); // Létrehoz egy új gomb elemet
    gombUrlap.textContent = 'hozzáadás'; // Beállítja a gomb szövegét 'hozzáadás'-ra
    urlapSim.appendChild(gombUrlap); // Hozzáadja a gombot az űrlaphoz

    /**
     * Űrlap elküldésekor végrehajtandó művelet
     * @param {Event} e - Az esemény objektum
     * @returns {EventListener}
     */
    urlapSim.addEventListener('submit', e => {
        e.preventDefault(); // Megakadályozza az űrlap alapértelmezett elküldését
        const ertekObject = {}; // Létrehoz egy új üres objektumot, ami az űrlap értékeit tárolja
        const bemenetiMezok = e.target.querySelectorAll('input'); // Kiválasztja az űrlap összes bemeneti mezőjét
        let mutat = true; // Inicializálja a mutat változót igazra

        bemenetiMezok.forEach(bemenetiMezo => { // Végigiterál a bemeneti mezőkön
            const hibaElem = bemenetiMezo.parentElement.querySelector('.hiba'); // Kiválasztja a hiba elemet a mező szülő eleméből
            hibaElem.textContent = ''; // Törli a hiba szövegét
            if (bemenetiMezo.value === '') { // Ha a bemeneti mező üres
                hibaElem.textContent = 'Kötelező mező'; // Beállítja a hiba szövegét 'Kötelező mező'-re
                mutat = false; // Beállítja a mutat változót hamisra
            } else { // Ha a bemeneti mező nem üres
                ertekObject[bemenetiMezo.id] = bemenetiMezo.value; // Hozzáadja a bemeneti mező értékét az objektumhoz a mező azonosítójával mint kulccsal
            }
        });

        if (mutat) { // Ha a mutat változó igaz
            tomb.push(ertekObject); // Hozzáadja az objektumot a tomb tömbhöz
            const sor = document.createElement('tr'); // Létrehoz egy új sor elemet
            ['nev', 'szolgalat', 'evszam', 'felfedezes'].forEach(kulcs => { // Végigiterál az objektum kulcsain
                const td = document.createElement('td'); // Létrehoz egy új cella elemet
                td.textContent = ertekObject[kulcs]; // Beállítja a cella szövegét az objektum kulcsának értékére
                sor.appendChild(td); // Hozzáadja a cellát a sorhoz
            });
            tablaTest.appendChild(sor); // Hozzáadja a sort a táblázathoz
        }
    });

    urlapDiv.appendChild(urlapSim); // Hozzáadja az űrlapot a div elemhez
    return urlapSim; // Visszaadja az űrlapot
};

const urlapSim = createForm(); // Meghívja a createForm függvényt, és eltárolja az eredményt urlapSim változóba
kontenerDiv.appendChild(urlapSim.parentElement); // Hozzáadja az űrlap szülő elemét a kontenerDiv-hez

createFileUpload(); // Meghívja a createFileUpload függvényt, hogy létrehozza a fájl feltöltő elemet
createFileDownload(); // Meghívja a createFileDownload függvényt, hogy létrehozza a fájl letöltő elemet


const urlapEredmenyDiv = csinalDiv('urlapFilter'); // Meghívjuk a csinalDiv függvényt 'urlapFilter' osztálynévvel, és eltároljuk az eredményt urlapEredmenyDiv néven
kontenerDiv.appendChild(urlapEredmenyDiv); // A konténer div-hez hozzáadjuk az urlapEredmenyDiv-et is

const urlapFilter = document.createElement('form'); // Létrehozunk egy új 'form' elemet, ami a szűrő űrlapot képviseli
urlapEredmenyDiv.appendChild(urlapFilter); // Hozzáadjuk az urlapFilter-t az urlapEredmenyDiv-hez

const bemenetSzuro = document.createElement('input'); // Létrehozunk egy új 'input' elemet, ami a szűrő bemenetét képviseli
bemenetSzuro.id = 'bemenetSzuro'; // Beállítjuk a bemenet azonosítóját 'bemenetSzuro'-ra
bemenetSzuro.placeholder = 'Név részlet'; // Beállítjuk a bemenet helyőrző szövegét 'Név részlet'-re
urlapFilter.appendChild(bemenetSzuro); // Hozzáadjuk a bemenetet az űrlaphoz

const selectSzuro = document.createElement('select'); // Létrehozunk egy új 'select' elemet, ami a szűrő kiválasztását képviseli
['', 'angol', 'portugal', 'spanyol'].forEach(szolg => { // Végigiterálunk a szolgáltatások tömb elemein
  const option = document.createElement('option'); // Létrehozunk egy új 'option' elemet, ami a kiválasztási lehetőséget képviseli
  option.value = szolg; // Beállítjuk az option értékét a szolgáltatás nevére
  option.textContent = szolg === '' ? 'üres' : szolg; // Beállítjuk az option szövegét a szolgáltatás nevére, ha üres, akkor 'üres'-t írunk ki
  selectSzuro.appendChild(option); // Hozzáadjuk az option-t a select-hez
});
urlapFilter.appendChild(selectSzuro); // Hozzáadjuk a select-et az űrlaphoz

const szuroGomb = document.createElement('button'); // Létrehozunk egy új 'button' elemet, ami a szűrő gombot képviseli
szuroGomb.type = 'button'; // Beállítjuk a gomb típusát 'button'-ra, hogy ne küldje el az űrlapot
szuroGomb.textContent = 'Számol'; // Beállítjuk a gomb szövegét 'Számol'-ra
urlapFilter.appendChild(szuroGomb); // Hozzáadjuk a gombot az űrlaphoz

const eredmenyDiv = document.createElement('div'); // Létrehozunk egy új 'div' elemet, ami az eredmény div-et képviseli
eredmenyDiv.className = 'result'; // Beállítjuk az eredmény div osztályát 'result'-ra
urlapEredmenyDiv.appendChild(eredmenyDiv); // Hozzáadjuk az eredmény div-et az urlapEredmenyDiv-hez

/**
 * Eseményfigyelő a szűrő gomb 'click' eseményére
 * @param {MouseEvent} e - Az esemény objektum, amely a 'click' eseményhez tartozik
 * @returns {EventListener}
 */
szuroGomb.addEventListener('click', () => {
    const nevSzuro = bemenetSzuro.value.trim().toLowerCase(); // Kiválasztjuk a név szűrőt, eltávolítjuk a felesleges szóközöket, és kisbetűsre alakítjuk
    const szolgalatSzuro = selectSzuro.value.trim().toLowerCase(); // Kiválasztjuk a szolgálat szűrőt, és kisbetűsre alakítjuk
  
    let szamlalo; // Létrehozunk egy változót, ami a szűrt elemek számát tárolja
  
    if (!nevSzuro && !szolgalatSzuro) { // Ha nincs szűrő beállítva
      szamlalo = tomb.length; // A szűrt elemek száma a tömb hossza
    } else if (nevSzuro && !szolgalatSzuro) { // Ha csak a név szűrő van beállítva
      szamlalo = tomb.filter(item => item.nev.toLowerCase().includes(nevSzuro)).length; // A szűrt elemek száma a név szűrő alapján
    } else if (!nevSzuro && szolgalatSzuro) { // Ha csak a szolgálat szűrő van beállítva
      szamlalo = tomb.filter(item => item.szolgalat.toLowerCase() === szolgalatSzuro).length; // A szűrt elemek száma a szolgálat szűrő alapján
    } else { // Ha mindkét szűrő be van állítva
      szamlalo = tomb.filter(item => // A szűrt elemek száma a név és szolgálat szűrő alapján
        item.nev.toLowerCase().includes(nevSzuro) && // A név szűrő alapján
        item.szolgalat.toLowerCase() === szolgalatSzuro // A szolgálat szűrő alapján
      ).length; // A szűrt elemek száma a név és szolgálat szűrő alapján
    }
  
    eredmenyDiv.textContent = `A feltételnek megfelelő elemek száma: ${szamlalo}`; // Beállítjuk az eredmény div szövegét a szűrt elemek számával
  });
