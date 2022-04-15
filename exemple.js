let input = prompt('ask!!!', '123');






function doWhile(variable, ask, type) {

	function isNumber(num) {
		return !isNaN(parseFloat(num)) && isFinite(num);
	}

	const circle = {
		null: function (variable, ask) {

			while (variable === null || variable === '') {
				variable = (prompt(ask));
			}

			return variable;
		},
		num: function (variable, ask) {

			while (!isNumber(variable)) {
				variable = (prompt(ask));
			}

			return variable;
		},
		str: function (variable, ask) {

			do {
				variable = (prompt(ask));
			} while (isNumber(variable));

			//return variable;
			console.log('circle str ', variable, ask, type);
		}
	};







	function deeplvl(variable, ask, type) {
		switch (type) {

			case 'str':
				if (isNumber(variable)) {
					console.log(isNumber(variable));
					circle.str(variable, ask);
					console.log('case str', variable, ask, type);
				}

				break;
			case 'num':

				if (!isNumber(variable)) {

					circle.num(variable, ask);
					console.log('case num', variable, ask, type);
					return Number(variable);

				}

				break;
		}

	}


	variable = variable.replace(/\s/g, '');
	deeplvl(variable, ask, type);
}

doWhile(input, 'ask!!!', 'str');


// function isNumber(num) {
// 	return !isNaN(parseFloat(num)) && isFinite(num);
// }


// console.log('doWhile', variable, ask, type);



// function reAsk(variable, ask) {
// 	console.log('reAskPrev', variable, ask, type);
// 	variable = (prompt(ask));
// 	console.log('reAskPost', variable, ask, type);

// 	deepLvl(variable, ask, type);
// }

//function deepLvl(variable, ask, type) {

// 	console.log('deepLvl', variable, ask, type);

// if (variable === null || variable === '') {
// 	reAsk(variable, ask);
// 	console.log('nal', variable);
// } else {
// 	variable = variable.replace(/\s/g, '');
// 	console.log('no nal', variable);

// 		switch (type) {

// 			case 'str':
// 				while (isNumber(variable)) {
// 					reAsk(variable, ask);
// 					console.log('case str', variable, ask, type);
// 				}

// 				break;
// 			case 'num':

// 				while (!isNumber(variable)) {

// 					variable = (prompt(ask));
// 					console.log('case num', variable, ask, type);
// 					return Number(variable);

// 				}

// 				break;
// 		}
// 		// if (type === 'num') {
// 		// 	return Number(variable);
// 		// } else {
// 		// 	return variable;
// 		// }
// 	}
// }

// deepLvl(variable, ask, type);








// function doWhile(variable, ask, type) {
// 	let tipeFunc;
// 	if (type === 'string') {
// 		tipeFunc = isNumber(variable);
// 	} else if (type === 'number') {
// 		tipeFunc = !isNumber(variable);
// 	}
// 	do {
// 		variable = prompt(ask);
// 	} while (tipeFunc);
// 	return variable;
// }





//doWhile(input, 'ask!!!', 'string');
//doWhile(input, 'ask!!!', 'number');
//console.log(doWhile(input, 'ask!!!', 'string'));
//console.log(doWhile(input, 'ask!!!', 'number'));