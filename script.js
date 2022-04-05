'use strict';

let title, screens, screenPrice, adaptive, service1, servicePrice1, service2,
servicePrice2, servicePrices, services, fullPrice,servicePercentPrice, allServicePrices;
let rollback = 10;

function showTypeOf(variable){console.log(variable, typeof variable)};

function isNumber(num){
return !isNaN(parseFloat(num))&&isFinite(num)
}

function asking(){
	title = prompt('Как называется ваш проект?','     prOject X');
	screens = prompt('Какие типы экранов нужно разработать?', "Простые, Сложные, Интерактивные");
do{
	screenPrice = Number(prompt('Сколько будет стоить данная работа?',12000))
}
while(!isNumber(screenPrice));

	adaptive = confirm('Нужен ли адаптив на сайте?');
}

const getAllServicePrices = function(){
let sum = 0;
for (let i =0; i<2;i++){
	
	if (i===0){
		service1 = prompt('Какой дополнительный тип услуги нужен?','google maps integrate')
	}else{
		service2 = prompt('Какой дополнительный тип услуги нужен?','Data base connect')
	};

do{
	sum+=Number(prompt('Сколько будет стоить?',1000))
}while(!isNumber(sum));


}
return sum
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



asking()

allServicePrices = getAllServicePrices()



fullPrice=getFullPrice(screenPrice, allServicePrices)
title = getTitle(title.trim())
servicePercentPrice= getServicePercentPrices(fullPrice, rollback);


showTypeOf(screens)
console.log("allServicePrices",allServicePrices)
showTypeOf(getRollbackMessage(fullPrice))
showTypeOf(servicePercentPrice)
