const elvalaszto = document.createElement('hr'); // hogy a html-en egyszeruen megtalalhato legyen az elvalaszto oop es sima kozott
document.body.appendChild(elvalaszto); // Hozzáadunk egy elválasztó elemet a body-hoz, hogy vizuálisan elválasszuk az OOP és a sima kódot
const mezokLista = [{ // Létrehozunk egy tömböt, ami a mezőket tárolja
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
const manager = new Manager(); // A Manager osztály példányosítása, létrehozva egy új menedzsert
const tabla = new Tablazat('table', manager); // A Tablazat osztály példányosítása, létrehozva egy új 'table' osztályú elemet
const urlap = new Urlap('form', mezokLista, manager); // Az Urlap osztály példányosítása, létrehozva egy új 'form' osztályú elemet
const fajlFeltoltes = new FeltoltesLetoltes('file', manager); // A FeltoltesLetoltes osztály példányosítása, létrehozva egy új 'file' osztályú elemet
const szuroOop = new Szuro('filter', manager); // A Szuro osztály példányosítása, létrehozva egy új 'filter' osztályú elemet