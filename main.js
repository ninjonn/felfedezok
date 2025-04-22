const tomb = [] // Létrehozunk egy tömböt, ami a táblázat adatait tárolja

const kontenerDiv = csinalDiv('container'); // Meghívjuk a csinalDiv függvényt 'container' osztálynévvel, és eltároljuk az eredményt kontenerDiv változóba
document.body.appendChild(kontenerDiv); // Hozzáadjuk a kontenerDiv-et az oldal body eleméhez

const tablaTest = createTable(); // Meghívja a createTable függvényt, és eltárolja az eredményt tablaTest változóba

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
