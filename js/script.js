'use strict';


const title = document.getElementsByTagName('h1')[0];
const buttonPlus = document.querySelector('.screen-btn');
const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');

const inputRange = document.querySelector('.rollback input');
const inputRangeValue = document.querySelector('.rollback .range-Value');

const startbtn = document.getElementsByClassName('handler_btn')[0];
const resetbtn = document.getElementsByClassName('handler_btn')[1];

const total = document.getElementsByClassName('total-input')[0];
const totalCount = document.getElementsByClassName('total-input')[1];
const totalCountOther = document.getElementsByClassName('total-input')[2];
const fullTotalCount = document.getElementsByClassName('total-input')[3];
const totalCountRollback = document.getElementsByClassName('total-input')[4];


let screens = document.querySelectorAll('.screen');


const appData = {

	title: '',
	screens: [],
	screenPrice: 0,
	adaptive: true,
	rollback: 10,
	servicePricesPercent: 0,
	servicePricesNumber: 0,
	fullPrice: 0,
	servicePercentPrice: 0,
	servicesPercent: {},
	servicesNumber: {},


	init: function () {
		appData.addTitle();
		startbtn.addEventListener('click', appData.start);
		buttonPlus.addEventListener('click', appData.addScreenblock);
	},
	addTitle: function () {
		document.title = title.textContent;
	},

	start: function () {
		appData.addScreens();
		appData.addServices();
		appData.addPrices();
		// appData.getServicePercentPrice();

		// appData.logger();


		appData.showResult();
	},

	showResult: function () {

		total.value = appData.screenPrice;
		totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
		fullTotalCount.value = appData.fullPrice;
		// totalCount.value=
		// totalCountRollback.value=
	},


	addScreens: function () {
		screens = document.querySelectorAll('.screen');
		screens.forEach((screen, index) => {
			const select = screen.querySelector('select');
			const input = screen.querySelector('input');
			const selectName = select.options[select.selectedIndex].textContent;
			appData.screens.push({
				id: index,
				name: selectName,
				price: Number(select.value) * Number(input.value)
			});
		});
		console.log(appData.screens);
	},

	addServices: function () {

		otherItemsPercent.forEach(function (item) {

			let check = item.querySelector('input[type=checkbox]');
			let label = item.querySelector('label');
			let input = item.querySelector('input[type=text]');

			if (check.checked) {
				appData.servicesPercent[label.textContent] = Number(input.value);
			}
		});

		otherItemsNumber.forEach(function (item) {

			let check = item.querySelector('input[type=checkbox]');
			let label = item.querySelector('label');
			let input = item.querySelector('input[type=text]');

			if (check.checked) {
				appData.servicesNumber[label.textContent] = Number(input.value);
			}

		});

	},
	addScreenblock: function () {
		screens = document.querySelectorAll('.screen');
		const cloneScreen = screens[0].cloneNode(true);
		screens[screens.length - 1].after(cloneScreen);

	},

	addPrices: function () {

		appData.screenPrice = appData.screens.reduce((sum, item) => {
			return sum + Number(item.price);
		}, 0);

		for (let key in appData.servicesNumber) {
			appData.servicePricesNumber += appData.servicesNumber[key];
		}
		for (let key in appData.servicesPercent) {
			appData.servicePricesPercent += appData.screenPrice *
				(appData.servicesPercent[key] / 100);
		}

		appData.fullPrice = +appData.screenPrice + appData.servicePricesNumber + appData.servicePricesPercent;
	},

	getServicePercentPrice: function () {
		appData.servicePercentPrice = appData.fullPrice -
			(appData.fullPrice * (appData.rollback / 100));
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



appData.init();