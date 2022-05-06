'use strict';
let body = document.querySelector('body').style.cssText = 'background-color:grey;color:white;';

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
const cmsCheckbox = document.querySelector('#cms-open');
const cmsBlock = document.querySelector('.hidden-cms-variants');
const cmsVariant = cmsBlock.querySelector('.main-controls__input');
const cmsSelect = cmsBlock.querySelector('select');
const cmsInput = cmsBlock.querySelector('input');

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

	cmsOperator: function () {

		const changer = () => {

			let cmsTotal;
			const inputBlur = () => {
				cmsTotal = +cmsInput.value;

			};

			switch (cmsSelect.selectedIndex) {
				case 2:
					cmsVariant.style.display = 'flex';
					cmsInput.addEventListener('focusout ', inputBlur());


					break;
					//return cmsTotal;
				case 1:
					cmsVariant.style.display = 'none';
					cmsTotal = 50;
					break;
					//return cmsTotal;
				default:
					cmsVariant.style.display = 'none';
					cmsTotal = 0;
					//return cmsTotal;
			}
			return cmsTotal;
		};

		const cmsViever = () => {
			if (cmsCheckbox.checked) {
				cmsBlock.style.display = 'flex';
				cmsSelect.addEventListener('change', changer);

			} else {
				cmsBlock.style.display = 'none';

			}

		};
		cmsViever();
		return changer();
	},

	appBlock: function (value) {
		const repleacerBtns = (value) => {
			if (value === 'block') {
				startbtn.style.display = 'none';
				resetbtn.style.display = 'block';
			} else {
				startbtn.style.display = 'block';
				resetbtn.style.display = 'none';
			}
		};

		const togglerSelectInput = (value) => {
			this.selects = document.querySelectorAll('select');
			this.inputs = document.querySelectorAll('input[type="text"]');
			if (value === 'block') {
				this.selects.forEach((item) => {
					item.disabled = 'true';
				});

				this.inputs.forEach((item) => {
					item.disabled = 'true';
				});
			}

		};


		repleacerBtns(value);
		togglerSelectInput(value);
		buttonPlus.removeEventListener('click', this.addScreenblock);
	},

	showResult: function () {
		total.value = this.screenPrice;
		totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber;
		fullTotalCount.value = this.fullPrice;
		totalCountRollback.value = this.servicePercentPrice;
		totalCount.value = this.screens.reduce((sum, item) => {
			return sum + item.count;
		}, 0);
	},

	addPrices: function () {
		this.screenPrice = this.screens.reduce((sum, item) => {
			return sum + Number(item.price);
		}, 0);

		for (let key in this.servicesNumber) {
			this.servicePricesNumber += this.servicesNumber[key];
		}
		for (let key in this.servicesPercent) {
			this.servicePricesPercent += this.screenPrice *
				(this.servicesPercent[key] / 100);
		}

		this.fullPrice = +this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;
		this.fullPrice = this.fullPrice + (this.fullPrice * (this.cmsOperator() / 100));

		this.servicePercentPrice = this.fullPrice -
			(this.fullPrice * (this.rollback / 100));
	},

	addServices: function () {
		otherItemsPercent.forEach((item) => {
			let check = item.querySelector('input[type=checkbox]');
			let label = item.querySelector('label');
			let input = item.querySelector('input[type=text]');

			if (check.checked) {
				appData.servicesPercent[label.textContent] = Number(input.value);
			}
		});

		otherItemsNumber.forEach((item) => {
			let check = item.querySelector('input[type=checkbox]');
			let label = item.querySelector('label');
			let input = item.querySelector('input[type=text]');

			if (check.checked) {
				this.servicesNumber[label.textContent] = Number(input.value);
			}
		});
	},

	addScreens: function () {
		screens = document.querySelectorAll('.screen');
		screens.forEach((screen, index) => {
			const select = screen.querySelector('select');
			const input = screen.querySelector('input');
			const selectName = select.options[select.selectedIndex].textContent;
			this.screens.push({
				id: index,
				name: selectName,
				price: Number(select.value) * Number(input.value),
				count: Number(input.value)
			});
		});
	},

	resetVal: function () {
		this.title = '';
		this.screens = [];
		this.screenPrice = 0;
		this.adaptive = true;
		this.rollback = Number(inputRange.value);
		this.servicePricesPercent = 0;
		this.servicePricesNumber = 0;
		this.fullPrice = 0;
		this.servicePercentPrice = 0;
		this.servicesPercent = {};
		this.servicesNumber = {};
	},

	start: function () {
		this.resetVal();
		this.addScreens();
		this.addServices();
		this.addPrices();
		this.showResult();
		this.appBlock('block');
		this.logger();
	},

	btnSwitcher: function () {
		if (this.btnController() === true) {
			this.start();
		} else {}
	},

	resetProg: function () {
		const showResultRemove = function () {
			total.value = 0;
			totalCountOther.value = 0;
			fullTotalCount.value = 0;
			totalCountRollback.value = 0;
			totalCount.value = 0;
			inputRange.value = 0;
			inputRangeValue.textContent = '0%';
		};

		const remover = function () {
			screens = document.querySelectorAll('.screen');
			screens.forEach((item, index) => {

				if (index === 0) {
					item.querySelector('select').disabled = '';
					item.querySelector('input').disabled = '';
				} else {
					item.remove();
				}
			});
			screens[0].querySelector('select').selectedIndex = '0';
			screens[0].querySelector('input').value = '';
		};


		remover();
		showResultRemove();
		this.appBlock('unblock');
		buttonPlus.addEventListener('click', this.addScreenblock);
		cmsCheckbox.checked = '';
		cmsBlock.style.display = 'none';
	},

	btnController: function () {
		let pull;
		let value;

		const premission = () => {
			if (!pull.includes(false)) {
				value = true;
			} else {
				value = false;
			}
		};

		const forEacher = () => {
			screens = document.querySelectorAll('.screen');
			pull = [];
			screens.forEach((screen) => {
				const select = screen.querySelector('select');
				const input = screen.querySelector('input');
				if (select.selectedIndex !== 0 && input.screens !== '') {
					pull.push(true);
				} else {
					pull.push(false);
				}
			});
		};

		forEacher();
		premission();
		return value;
	},

	percentInput: function (event) {
		inputRangeValue.textContent = event.target.value + '%';
	},

	addScreenblock: function () {
		screens = document.querySelectorAll('.screen');
		const cloneScreen = screens[0].cloneNode(true);
		screens[screens.length - 1].after(cloneScreen);
	},

	addTitle: function () {
		document.title = title.textContent;
	},

	init: function () {
		this.addTitle();
		buttonPlus.addEventListener('click', this.addScreenblock);
		inputRange.addEventListener('input', this.percentInput);
		startbtn.addEventListener('mouseover', this.btnController);
		startbtn.addEventListener('click', this.btnSwitcher.bind(appData));
		resetbtn.addEventListener('click', this.resetProg.bind(appData));
		cmsCheckbox.addEventListener('input', this.cmsOperator);
	},

	logger: function () {
		//console.log(appData.cmsOperator());
	}

};


appData.init();