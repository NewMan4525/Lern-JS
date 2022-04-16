'use strict';

let screens = document.querySelectorAll('.screen');
const dom = {
	title: document.getElementsByTagName('h1')[0],
	btns: document.getElementsByClassName('handler_btn'),
	btnPlus: document.querySelector('.screen-btn'),
	otherPercent: document.querySelectorAll('.other-items.percent'),
	otherNumber: document.querySelectorAll('.other-items.number'),
	inputRange: document.querySelector('.main-controls__range > [type = "range"]'),
	getTotals: () => {
		let totalInputs = document.getElementsByClassName('total-input');
		for (let i = 0; i < 5; i++) {
			let totalInput = dom['totalInput' + ' ' + i] = totalInputs[`${i}`];
		}
	}

};


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

dom.getTotals();
console.log(screens, dom);
appData.start();