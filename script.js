'use strict';

let title = prompt('Как называется ваш проект?','project X'),
screens = prompt('Какие типы экранов нужно разработать?', "Простые, Сложные, Интерактивные"),
screenPrice = Number(prompt('Сколько будет стоить данная работа?',12000)),
rollback = 10,
adaptive = confirm('Нужен ли адаптив на сайте?'),
service1 = prompt('Какой дополнительный тип услуги нужен?','google maps integrate'),
servicePrice1 = Number(prompt('Сколько будет стоить интеграция с google maps?',10000)),
service2 = prompt('Какой дополнительный тип услуги нужен?','Data base connect'),
servicePrice2 = Number(prompt('Сколько будет стоить подключение Data base?',10000)),
fullPrice = screenPrice + servicePrice1 + servicePrice2,
servicePercentPrice = Math.ceil( fullPrice - (fullPrice /100*rollback));

let discount, ultimatePrice;//для расчета конечной суммы

if(fullPrice >= 30000) {discount = 10; alert("Даем скидку  в "+`${discount}`+"%");}
else if( 30000 > fullPrice && fullPrice >= 15000) {discount = 5; alert("Даем скидку  в "+`${discount}`+"%");}
else if( 15000 > fullPrice && fullPrice > 0) {discount = 0; console.log("Скидка не предусмотрена");}
else if( 0 == fullPrice) {discount = 0; console.log("Что-то пошло не так, тренеруйте отдел продаж )))");}
else if( 0 > fullPrice) {discount = 0; console.log("Что-то пошло не так мы не можем быть должны клиенту )))");}

ultimatePrice = Math.ceil( servicePercentPrice - (servicePercentPrice /100*discount));

console.log(servicePercentPrice)
console.log(ultimatePrice)