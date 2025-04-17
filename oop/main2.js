const elvalaszto = document.createElement('hr'); // hogy a html-en egyszeruen megtalalhato legyen az elvalaszto oop es sima kozott
document.body.appendChild(elvalaszto); // Hozzáadunk egy elválasztó elemet a body-hoz, hogy vizuálisan elválasszuk az OOP és a sima kódot
const tabla = new Tablazat('table'); // A Tablazat osztály példányosítása, létrehozva egy új 'table' osztályú elemet
const urlap = new Urlap('form'); // Az Urlap osztály példányosítása, létrehozva egy új 'form' osztályú elemet