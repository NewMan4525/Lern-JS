let title = 'project X';
let screens = "Простые, Сложные, Интерактивные";
let screenPrice = 100;
let rollback = 10;
let fullPrice = 100000;
let adaptive = true;

console.log(title);
console.log(fullPrice);
console.log(adaptive);

console.log(screens.length);

console.log("Стоймость верстки экранов",screenPrice,"долларов" );
console.log("Стоимость разработки сайта", `${fullPrice}`, "юани" );
console.log(screens.toLowerCase().split(", "))
console.log(fullPrice * (rollback/100))