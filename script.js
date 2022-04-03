'use strict';

let title = prompt('Как называется ваш проект?','     prOject X'),
screens = prompt('Какие типы экранов нужно разработать?', "Простые, Сложные, Интерактивные"),
screenPrice = Number(prompt('Сколько будет стоить данная работа?',12000)),
adaptive = confirm('Нужен ли адаптив на сайте?'),
service1 = prompt('Какой дополнительный тип услуги нужен?','google maps integrate'),
servicePrice1 = Number(prompt('Сколько будет стоить '+`${service1}`+'?',10000)),
service2 = prompt('Какой дополнительный тип услуги нужен?','Data base connect'),
servicePrice2 = Number(prompt('Сколько будет стоить '+`${service2}`+'?',10000));

let rollback = 10;

let fullPrice,servicePercentPrice, allServicePrices;


function showTypeOf(variable){console.log(variable, typeof variable)};

const getAllServicePrices = function(additionalService1, additionalService2){
return additionalService1 + additionalService2;
}

function getFullPrice(primaryService, aboutAdditionalServices){
	return primaryService + aboutAdditionalServices;
}

function getTitle(stringVariable){
	return stringVariable[0].toUpperCase() + stringVariable.slice(1).toLowerCase();
}

function getServicePercentPrices(ultimatePrice,persent){
return Math.ceil( ultimatePrice - (ultimatePrice /100*persent))
}

function getRollbackMessage(money){
if(money >= 30000) {return "Даем скидку  в 10%";}
else if( 30000 > money && money >= 15000){return "Даем скидку  в 5%";}
else if( 15000 > money && money > 0) {return "Скидка не предусмотрена";}
else if( 0 == money) {return "Что-то пошло не так, тренеруйте отдел продаж )))";}
else if( 0 > money) {return "Что-то пошло не так, мы не можем быть должны клиенту )))";}
}


allServicePrices = getAllServicePrices(servicePrice1, servicePrice2)
fullPrice=getFullPrice(screenPrice, allServicePrices)
title = getTitle(title.trim())
servicePercentPrice= getServicePercentPrices(fullPrice, rollback);


showTypeOf(screens)
showTypeOf(getRollbackMessage(fullPrice))
showTypeOf(servicePercentPrice)
