'use strict';

//let title = prompt('Как называется ваш проект?','project X');
//let screens = prompt('Какие типы экранов нужно разработать?', "Простые, Сложные, Интерактивные");
let screenPrice = Number(prompt('Сколько будет стоить данная работа?',12000));
let rollback = 10;
//let adaptive = confirm('Нужен ли адаптив на сайте?');
//let service1 = prompt('Какой дополнительный тип услуги нужен?','google maps integrate');
let servicePrice1 = Number(prompt('Сколько будет стоить интеграция с google maps?',10000));
//let service2 = prompt('Какой дополнительный тип услуги нужен?','Data base connect');
let servicePrice2 = Number(prompt('Сколько будет стоить подключение Data base?',10000));
let fullPrice = screenPrice + servicePrice1 + servicePrice2;
let servicePercentPrice = Math.ceil( fullPrice - (fullPrice /100*rollback));

//console.log(fullPrice)
console.log(servicePercentPrice)