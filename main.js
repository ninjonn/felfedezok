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
const tablaDiv = csinalDiv('table'); // Meghívjuk a csinalDiv függvényt 'table' osztálynévvel
const tablaSim = document.createElement('table'); // Létrehozunk egy új 'table' elemet
tablaDiv.appendChild(tablaSim); // Hozzáadjuk a tablaSim-t a tablaDiv-hez
const tablaFejlec = document.createElement('thead'); // Létrehozunk egy új 'thead' elemet, ami a táblázat fejlécét képviseli
tablaSim.appendChild(tablaFejlec); // Hozzáadjuk a 'thead' elemet a táblázathoz
const tablaFejSor = document.createElement('tr'); // Létrehozunk egy új 'tr' elemet, ami a táblázat fejlécének sorát képviseli
tablaFejlec.appendChild(tablaFejSor) // Létrehozunk egy új 'tr' elemet, ami a táblázat fejlécének sorát képviseli
const theadCella = ['név', 'szolgálat', 'évszám', 'felfedezés']; // Létrehozunk egy tömböt, ami a fejléc celláinak tartalmát tárolja
for (const cellaTartalom of theadCella) { // Végigiterálunk a theadCella tömb elemein
    const thcella = document.createElement('th'); // Létrehozunk egy új 'th' elemet, ami a táblázat fejlécének cellája lesz
    thcella.innerText = cellaTartalom; // Beállítjuk a cella szövegét a cellaTartalom változó értékére
    tablaFejSor.appendChild(thcella); // Hozzáadjuk a cellát a fejléc sorhoz
}
const tablaTest = document.createElement('tbody'); // Létrehozunk egy új 'tablaTest' elemet
tablaSim.appendChild(tablaTest); // Hozzáadjuk a 'tablaTest' elemet a táblázathoz

const urlapDiv = csinalDiv('form'); // Meghívjuk a makeDiv-et, ezúttal 'form' osztálynévvel, és eltároljuk az eredményt urlapDiv néven

const urlapSim = document.createElement('form'); // Létrehozunk egy új 'form' elemet
urlapDiv.appendChild(urlapSim) // Hozzáadjuk a urlapSim-t a urlapDiv-hez
const mezoLista = [{ // Létrehozunk egy tömböt, ami a mezőket tárolja
    mezoid: 'nev', // A mező azonosítója
    mezocimke: 'név' // A mező címkéje
},
{
    mezoid: 'szolgalat', // A mező azonosítója
    mezocimke: 'szolgálat' // A mező címkéje
},
{
    mezoid: 'evszam', // A mező azonosítója
    mezocimke: 'évszám' // A mező címkéje
},
{
    mezoid: 'felfedezes', // A mező azonosítója
    mezocimke: 'felfedezés' // A mező címkéje
}]

for (const mezoElem of mezoLista) { // Végigiterálunk a mezoElemLista tömb elemein
    const mezo = csinalDiv('field'); // Meghívjuk a csinalDiv függvényt 'field' osztálynévvel, és eltároljuk az eredményt mezo néven
    urlapSim.appendChild(mezo); // Hozzáadjuk a mezo-t a urlapSim-hez
    const cimke = document.createElement('label'); // Létrehozunk egy új 'label' elemet
    cimke.htmlFor = mezoElem.mezoid; // Beállítjuk a címke htmlFor attribútumát a mező azonosítójára
    cimke.textContent = mezoElem.mezocimke; // Beállítjuk a címke szövegét a mező címkéjére
    mezo.appendChild(cimke) // Hozzáadjuk a címkét a mezőhöz
    mezo.appendChild(document.createElement('br')) // Hozzáadunk egy új 'br' elemet a mezőhöz, hogy új sort hozzunk létre
    const input = document.createElement('input'); // Létrehozunk egy új 'input' elemet
    input.id = mezoElem.mezoid; // Beállítjuk az input azonosítóját a mező azonosítójára
    mezo.appendChild(input) // Hozzáadjuk az input elemet a mezőhöz
    mezo.appendChild(document.createElement('br')) // Hozzáadunk egy új 'br' elemet a mezőhöz, hogy új sort hozzunk létre
    const hiba = document.createElement('span'); // Létrehozunk egy új 'span' elemet, ami a hibaüzenetet fogja tárolni
    hiba.className = 'hiba'; // Beállítjuk a hibaüzenet osztályát 'hiba'-ra
    mezo.appendChild(hiba); // Hozzáadjuk a hibaüzenetet a mezőhöz
}

const gombUrlap = document.createElement('button'); // Létrehozunk egy új 'button' elemet
gombUrlap.textContent = 'hozzáadás'; // Beállítjuk a gomb szövegét 'hozzáadás'-ra
urlapSim.appendChild(gombUrlap) // Hozzáadjuk a gombot az űrlaphoz

/**
 * Eseményfigyelő az űrlap 'submit' eseményére
 * Az űrlap beküldésekor megakadályozza az alapértelmezett viselkedést,
 * összegyűjti a mezők értékeit, hozzáadja azokat egy tömbhöz, és frissíti a táblázatot az új adatokkal
 * @param {SubmitEvent} e - Az esemény objektum, amely a 'submit' eseményhez tartozik
 */
urlapSim.addEventListener('submit', (e) => { // Hozzáadunk egy eseményfigyelőt az űrlaphoz, ami a 'submit' eseményre reagál
    e.preventDefault(); // Megakadályozzuk az űrlap alapértelmezett viselkedését
    const ertekObject = {} // Létrehozunk egy üres objektumot, ami a mezők értékeit tárolja
    const bemenetiMezok = e.target.querySelectorAll('input'); // Kiválasztjuk az összes bemeneti mezőt az űrlapon
    let mutat = true; // Létrehozunk egy változót, ami jelzi, hogy a mezők értékei érvényesek-e
    for (const bemenetiMezo of bemenetiMezok) { // Végigiterálunk a bemeneti mezőkön
        const hibaElem = bemenetiMezo.parentElement.querySelector('.hiba'); // Kiválasztjuk a hibaüzenetet a mező szülőeleméből
        hibaElem.textContent = ''; // Töröljük a hibaüzenetet
        if (bemenetiMezo.value === '') { // Ha a mező értéke üres
            hibaElem.textContent = 'Kötelező mező'; // Beállítjuk a hibaüzenetet
            mutat = false; // Beállítjuk a mutat változót hamisra
        } else { // Ha a mező értéke nem üres
            ertekObject[bemenetiMezo.id] = bemenetiMezo.value; // Hozzáadjuk az objektumhoz a mező azonosítóját és értékét
        }
    }

    if (mutat) { // Ha a mutat változó hamis
        tomb.push(ertekObject); // Hozzáadjuk az objektumot a tomb tömbhöz
        const tablaTestSor = document.createElement('tr'); // Létrehozunk egy új 'tr' elemet, ami a táblázat törzsében egy sort képvisel
        tablaTest.appendChild(tablaTestSor); // Hozzáadjuk a sort a táblázat törzséhez

        const nevCella = document.createElement('td'); // Létrehozunk egy új 'td' elemet, ami a táblázat törzsében egy cellát képvisel
        nevCella.textContent = ertekObject.nev; // Beállítjuk a cella szövegét az objektum 'nev' kulcsának értékére
        tablaTestSor.appendChild(nevCella); // Hozzáadjuk a cellát a sorhoz

        const szolgalatCella = document.createElement('td'); // Létrehozunk egy új 'td' elemet, ami a táblázat törzsében egy cellát képvisel
        szolgalatCella.textContent = ertekObject.szolgalat; // Beállítjuk a cella szövegét az objektum 'szolgalat' kulcsának értékére
        tablaTestSor.appendChild(szolgalatCella); // Hozzáadjuk a cellát a sorhoz

        const evszamCella = document.createElement('td'); // Létrehozunk egy új 'td' elemet, ami a táblázat törzsében egy cellát képvisel
        evszamCella.textContent = ertekObject.evszam; // Beállítjuk a cella szövegét az objektum 'evszam' kulcsának értékére
        tablaTestSor.appendChild(evszamCella); // Hozzáadjuk a cellát a sorhoz

        const felfedezesCella = document.createElement('td'); // Létrehozunk egy új 'td' elemet, ami a táblázat törzsében egy cellát képvisel
        felfedezesCella.textContent = ertekObject.felfedezes; // Beállítjuk a cella szövegét az objektum 'felfedezes' kulcsának értékére
        tablaTestSor.appendChild(felfedezesCella); // Hozzáadjuk a cellát a sorhoz
    }
})

kontenerDiv.appendChild(tablaDiv); // A konténer div-hez hozzáadjuk a tablaDiv-et
kontenerDiv.appendChild(urlapDiv); // A konténer div-hez hozzáadjuk az urlapDiv-et is

const fajlInput = document.createElement('input') // Létrehozunk egy új 'input' elemet, ami a fájl kiválasztására szolgál
kontenerDiv.appendChild(fajlInput); // A konténer div-hez hozzáadjuk a fájl inputot
fajlInput.id='fajlInput' // Beállítjuk a fájl input azonosítóját 'fajlInput'-ra
fajlInput.type = 'file'; // Beállítjuk a fájl input típusát 'file'-ra
/**
 * Eseményfigyelő a fájl input 'change' eseményére
 * @param {Event} e - Az esemény objektum, amely a 'change' eseményhez tartozik
 */
fajlInput.addEventListener('change', (e) => { 
    const fajl = e.target.files[0]; // Kiválasztjuk a fájlt az inputból
    const fajlBeolvaso = new FileReader(); // Létrehozunk egy új FileReader objektumot, ami a fájl beolvasására szolgál
    fajlBeolvaso.onload = () => { // Beállítjuk a fájl beolvasásának eseményfigyelőjét
       const fileLines = fajlBeolvaso.result.split('\n') // A fájl tartalmát sorokra bontjuk
       const fejlecTorles = fileLines.slice(1); // Az első sort eltávolítjuk, mert az a fejléc
       for(const sor of fejlecTorles){ // Végigiterálunk a fájl sorain
            const tagoltSor = sor.trim(); // Eltávolítjuk a felesleges szóközöket a sor elejéről és végéről
            const mezok = tagoltSor.split(';'); // A sort mezőkre bontjuk a pontosvesszők mentén

            const felfedezesek = { // Létrehozunk egy új objektumot, ami a felfedezéseket tárolja
                nev: mezok[0].trim(), // A felfedező neve
                szolgalat: mezok[1].trim(), // A felfedező szolgálata
                evszam: mezok[2].trim(), // A felfedezés évszáma
                felfedezes: mezok[3].trim() // A felfedezés neve
            }
            tomb.push(felfedezesek); // Hozzáadjuk az objektumot a tomb tömbhöz
            const tableTestSor = document.createElement('tr'); // Létrehozunk egy új 'tr' elemet, ami a táblázat törzsében egy sort képvisel
            tablaTest.appendChild(tableTestSor); // Hozzáadjuk a sort a táblázat törzséhez
            
            const nevCella = document.createElement('td'); // Létrehozunk egy új 'td' elemet, ami a táblázat törzsében egy cellát képvisel
            nevCella.textContent = felfedezesek.nev; // Beállítjuk a cella szövegét az objektum 'nev' kulcsának értékére
            tableTestSor.appendChild(nevCella); // Hozzáadjuk a cellát a sorhoz
        
            const szolgalatCella = document.createElement('td'); // Létrehozunk egy új 'td' elemet, ami a táblázat törzsében egy cellát képvisel
            szolgalatCella.textContent = felfedezesek.szolgalat; // Beállítjuk a cella szövegét az objektum 'szolgalat' kulcsának értékére
            tableTestSor.appendChild(szolgalatCella); // Hozzáadjuk a cellát a sorhoz
        
            const evszamCella = document.createElement('td'); // Létrehozunk egy új 'td' elemet, ami a táblázat törzsében egy cellát képvisel
            evszamCella.textContent = felfedezesek.evszam; // Beállítjuk a cella szövegét az objektum 'evszam' kulcsának értékére
            tableTestSor.appendChild(evszamCella); // Hozzáadjuk a cellát a sorhoz

            const felfedezesCella = document.createElement('td'); // Létrehozunk egy új 'td' elemet, ami a táblázat törzsében egy cellát képvisel
            felfedezesCella.textContent = felfedezesek.felfedezes; // Beállítjuk a cella szövegét az objektum 'felfedezes' kulcsának értékére
            tableTestSor.appendChild(felfedezesCella); // Hozzáadjuk a cellát a sorhoz
       }
    }
    fajlBeolvaso.readAsText(fajl); // Beolvassuk a fájlt szövegként
})

const letoltesGomb = document.createElement('button'); // Létrehozunk egy új 'button' elemet, ami a fájl letöltésére szolgál
letoltesGomb.textContent = 'Letöltés'; // Beállítjuk a gomb szövegét 'Letöltés'-re
kontenerDiv.appendChild(letoltesGomb); // A konténer div-hez hozzáadjuk a letöltés gombot

/**
 * Eseményfigyelő a letöltés gomb 'click' eseményére
 * @param {MouseEvent} e - Az esemény objektum, amely a 'click' eseményhez tartozik
 */
letoltesGomb.addEventListener('click', () => {
    const link = document.createElement('a'); // Létrehozunk egy új 'a' elemet, ami a fájl letöltésére szolgál
    const tartalomTomb = ['nev;szolgalat;evszam;felfedezes']; // Létrehozunk egy tömböt, ami a fájl tartalmát tárolja, az első elem a fejléc
    for(const felfedezes of tomb){ // Végigiterálunk a felfedezések tömb elemein
        tartalomTomb.push(`${felfedezes.nev};${felfedezes.szolgalat};${felfedezes.evszam};${felfedezes.felfedezes}`); // Hozzáadjuk a felfedezés adatait a tartalom tömbhöz, pontosvesszővel elválasztva
    }
    const tartalom = tartalomTomb.join('\n'); // A tartalom tömböt egyetlen szöveggé alakítjuk, ahol a sorokat új sorral választjuk el
    const fajl = new Blob([tartalom], { type: 'text/csv' }) // Létrehozunk egy új Blob objektumot, ami a fájl tartalmát tárolja, és beállítjuk a típusát 'text/csv'-ra
    link.href = URL.createObjectURL(fajl); // Beállítjuk a link href attribútumát a Blob objektum URL-jére
    link.download = 'newdata.csv' // Beállítjuk a letöltési fájl nevét 'newdata.csv'-ra
    link.click(); // Kattintunk a linkre, hogy elindítsuk a letöltést
    URL.revokeObjectURL(link.href); // Visszavonjuk a Blob objektum URL-jét, hogy felszabadítsuk a memóriát
})


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
 */
szuroGomb.addEventListener('click', () => {
  const nevSzuro = selectSzuro.value.trim().toLowerCase(); // Kiválasztjuk a név szűrőt, eltávolítjuk a felesleges szóközöket, és kisbetűsre alakítjuk
  const szolgalatSzuro = bemenetSzuro.value; // Kiválasztjuk a szolgálat szűrőt

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
