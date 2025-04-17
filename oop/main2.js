const elvalaszto = document.createElement('hr'); // hogy a html-en egyszeruen megtalalhato legyen az elvalaszto oop es sima kozott
document.body.appendChild(elvalaszto); // Hozzáadunk egy elválasztó elemet a body-hoz, hogy vizuálisan elválasszuk az OOP és a sima kódot
const tabla = new Tablazat('table'); // A Terulet osztály példányosítása, létrehozva egy új 'table' osztályú elemet
const urlap = new Terulet('form'); // A Terulet osztály példányosítása, létrehozva egy új 'table' és 'form' osztályú elemet