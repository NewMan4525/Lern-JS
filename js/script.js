'use strict';


const title = document.getElementsByTagName('h1')[0];
const buttonPlus = document.querySelector('.screen-btn');
const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');

const inputRange = document.querySelector('.rollback input');
const inputRangeValue = document.querySelector('.rollback .range-Value');

const startbtn = document.getElementsByClassName('handler_btn')[0];
const resetbtn = document.getElementsByClassName('handler_btn')[1];

const total = document.getElementsByClassName('totalinput')[0];
const totalCount = document.getElementsByClassName('totalinput')[1];
const totalCountOther = document.getElementsByClassName('totalinput')[2];
const fullTotalCount = document.getElementsByClassName('totalinput')[3];
const totalCountRollback = document.getElementsByClassName('totalinput')[4];


let screens = document.querySelectorAll('.screen');


const appData = {

	title: '',
	screens: [],
	screenPrice: 0,
	adaptive: true,
	rollback: 10,
	allServicePrices: 0,
	fullPrice: 0,
	servicePercentPrice: 0,
	services: {},


	start: function () {
		appData.asking();
		appData.addPrices();
		appData.getFullPrice();
		appData.getServicePercentPrice();
		appData.getTitle();

		appData.logger();
	},

	isNumber: function (num) {
		return !isNaN(parseFloat(num)) && isFinite(num);
	},

	asking: function () {
		let arr = [];

		do {
			appData.title = prompt('Как называется ваш проект?', '     prOject X');
		} while (appData.isNumber(appData.title));
		for (let i = 0; i < 2; i++) {
			let name;
			do {
				name = prompt('Какие типы экранов нужно разработать?', "Сложные");
			} while (appData.isNumber(name));

			let price = 0;
			do {
				price = (prompt('Сколько будет стоить данная работа?', 10000));
			} while (!appData.isNumber(price));
			appData.screens.push({
				id: i,
				name: name,
				price: price
			});


		}


		for (let i = 0; i < 2; i++) {
			let name;
			do {
				name = prompt('Какой дополнительный тип услуги нужен?', 'метрика');
			} while (appData.isNumber(name));
			let price = 0;

			do {
				price = Number(prompt('Сколько это будет стоить?', 1000));
			} while (!appData.isNumber(price));

			arr[i] = name;

			if (arr[0] === arr[1]) {
				name = name + ' ' + 'дополнительно';
			}

			appData.services[name] = +price;

		}
		appData.adaptive = confirm('Нужен ли адаптив на сайте?');
	},

	addPrices: function () {

		appData.screenPrice = appData.screens.reduce((sum, item) => {
			return sum + Number(item.price);
		}, 0);

		for (let key in appData.services) {
			appData.allServicePrices += appData.services[key];
		}

	},



	getFullPrice: function () {
		appData.fullPrice = +appData.screenPrice + appData.allServicePrices;
	},

	getServicePercentPrice: function () {
		appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));
	},

	getTitle: function () {
		appData.title = appData.title.trim()[0].toUpperCase() + appData.title.trim().substr(1).toLowerCase();
	},

	getRollbackMessage: function (price) {
		if (price >= 30000) {
			return "Даем скидку  в 10%";
		} else if (price >= 15000 && price < 30000) {
			return "Даем скидку  в 5%";
		} else if (price > 0 && price < 15000) {
			return "Скидка не предусмотрена";
		} else if (0 == price) {
			return "Что-то пошло не так";
		}
	},

	logger: function () {

		console.log(appData.fullPrice);
		console.log(appData.servicePercentPrice);
		console.log('services', appData.services);
		console.log('screens', appData.screens);
	}

};


console.log(screens);
appData.start();