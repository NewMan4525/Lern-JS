'use strict';

const appData = {
	title: '',
	screens: '',
	screenPrice: 0,
	adaptive: true,
	rollback: 10,
	allServicePrices: 0,
	fullPrice: 0,
	servicePercentPrice: 0,
	service1: '',
	service2: '',

	showTypeOf: function (variable) {
		console.log(variable, typeof variable);
	},

	isNumber: function (num) {
		return !isNaN(parseFloat(num)) && isFinite(num);
	},


	asking: function () {
		appData.title = prompt('Как называется ваш проект?', '     prOject X');
		appData.screens = prompt('Какие типы экранов нужно разработать?', "Простые, Сложные, Интерактивные");
		do {
			appData.screenPrice = Number(prompt('Сколько будет стоить данная работа?', 12000));
		}
		while (!appData.isNumber(appData.screenPrice));

		appData.adaptive = confirm('Нужен ли адаптив на сайте?');
	},
	getAllServicePrices: function () {
		let sum = 0;
		for (let i = 0; i < 2; i++) {

			if (i === 0) {
				appData.service1 = prompt('Какой дополнительный тип услуги нужен?', 'google maps integrate');
			} else {
				appData.service2 = prompt('Какой дополнительный тип услуги нужен?', 'Data base connect');
			}

			do {
				sum += Number(prompt('Сколько будет стоить?', 1000));
			} while (!appData.isNumber(sum));


		}
		return sum;
	},
	getFullPrice: function (primaryService, aboutAdditionalServices) {
		return primaryService + aboutAdditionalServices;
	},

	getServicePercentPrices: function (ultimatePrice, persent) {
		return Math.ceil(ultimatePrice - (ultimatePrice / 100 * persent));
	},

	getTitle: function (stringVariable) {
		return stringVariable[0].toUpperCase() + stringVariable.slice(1).toLowerCase();
	},


	getRollbackMessage: function (money) {
		if (money >= 30000) {
			return "Даем скидку  в 10%";
		} else if (30000 > money && money >= 15000) {
			return "Даем скидку  в 5%";
		} else if (15000 > money && money > 0) {
			return "Скидка не предусмотрена";
		} else if (0 == money) {
			return "Что-то пошло не так, тренеруйте отдел продаж )))";
		} else if (0 > money) {
			return "Что-то пошло не так, мы не можем быть должны клиенту )))";
		}
	},
	start: function () {
		appData.asking();
		appData.allServicePrices = appData.getAllServicePrices();
		appData.fullPrice = appData.getFullPrice(appData.screenPrice, appData.allServicePrices);
		appData.servicePercentPrice = appData.getServicePercentPrices(appData.fullPrice, appData.rollback);
		appData.title = appData.getTitle(appData.title.trim());
		appData.getRollbackMessage(appData.servicePercentPrice);
		appData.logger();
	},
	logger: function () {
		for (let key in appData) {

			console.log(key, appData[key]);
		}
		// console.log(appData.fullPrice);
		// console.log(appData.servicePercentPrice);
		// console.log(appData.getRollbackMessage(appData.servicePercentPrice));
	}
};

appData.start();

// 1) Перенести все функции в объект (сделать их методами объекта)

// 2) Создать в объекте метод start и перенести в него вызов метода asking и переопределение свойств.
// Вне самого объекта запускаем только метод start который в нужном порядке выполнит все действия.

// 3) Создать в объекте метод logger который будет выводить в консоль необходимую информацию.
// Данный метод запускаем в самом конце метода start (после того как все расчеты уже были произведены)

// 4) Вывести в консоль из метода logger все свойства и методы объекта appData с помощью цикла for in
// Таким образом вне объекта теперь должен быть только вызов метода start( )