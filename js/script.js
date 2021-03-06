'use strict';
//4commit

const title = document.getElementsByTagName('h1')[0];
const buttonPlus = document.querySelector('.screen-btn');
const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');

const inputRange = document.querySelector('.rollback input');
const inputRangeValue = document.querySelector('.range-value');

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
	rollback: Number(inputRange.value),
	servicePricesPercent: 0,
	servicePricesNumber: 0,
	fullPrice: 0,
	servicePercentPrice: 0,
	servicesPercent: {},
	servicesNumber: {},


	init: function () {
		appData.addTitle();
		buttonPlus.addEventListener('click', appData.addScreenblock);
		inputRange.addEventListener('input', appData.percentInput);
		startbtn.addEventListener('mouseover', appData.btnController);

	},

	btnController: function () {

		let pull = [];


		function resetValStart() {

			appData.title = '';
			appData.screens = [];
			appData.screenPrice = 0;
			appData.adaptive = true;
			appData.rollback = Number(inputRange.value);
			appData.servicePricesPercent = 0;
			appData.servicePricesNumber = 0;
			appData.fullPrice = 0;
			appData.servicePercentPrice = 0;
			appData.servicesPercent = {};
			appData.servicesNumber = {};


			appData.start();
		}

		function premission() {

			if (pull.includes(false)) {
				startbtn.removeEventListener('click', resetValStart);
			} else {
				startbtn.addEventListener('click', resetValStart);
			}
		}

		function pusher(select, input) {
			if (select.selectedIndex !== 0 && input.value !== '') {
				pull.push(true);
			} else {
				pull.push(false);
			}
		}

		function forEacher(value) {

			value.forEach((screen) => {
				const select = screen.querySelector('select');
				const input = screen.querySelector('input');
				pusher(select, input);
			});
		}

		screens = document.querySelectorAll('.screen');
		forEacher(screens);
		premission();
	},

	percentInput: function (event) {
		inputRangeValue.textContent = event.target.value + '%';
	},

	addTitle: function () {
		document.title = title.textContent;
	},

	start: function () {
		appData.addScreens();
		appData.addServices();
		appData.addPrices();


		appData.logger();

		appData.showResult();
	},

	showResult: function () {

		total.value = appData.screenPrice;
		totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
		fullTotalCount.value = appData.fullPrice;
		totalCountRollback.value = appData.servicePercentPrice;
		totalCount.value = appData.screens.reduce(function (sum, item) {
			return sum + item.count;
		}, 0);

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
				price: Number(select.value) * Number(input.value),
				count: Number(input.value)
			});
			console.log(appData.screens);
		});

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

		appData.servicePercentPrice = appData.fullPrice -
			(appData.fullPrice * (appData.rollback / 100));

	},

	logger: function () {
		///console.log(appData.screens);
	}

};


appData.init();