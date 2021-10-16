import { testLengthofInputValue, testEmailAddress } from './libs/validation.js';

import alert from './components/alert.js';

import { saveToLocalStorage } from './libs/localStorageHelpers.js';

let form = document.querySelector('.form');
let email = document.querySelector('#exampleInputEmail1');
let password = document.querySelector('#exampleInputPassword1');

form.onsubmit = async function (event) {
	event.preventDefault();

	if (
		testLengthofInputValue(password.value, 1) &&
		testEmailAddress(email.value)
	) {
		try {
			const { data } = await axios.post(
				'http://localhost:1337/auth/local',

				{
					identifier: email.value,
					password: password.value,
				}
			);

			console.log(data);

			saveToLocalStorage('jwt', data.jwt);

			saveToLocalStorage('user', data.user);

			window.location.href = './loggedin.html';
		} catch (error) {
			alert('alert-error', 'Your login credentials were incorrect');
		}
	} else {
		alert('alert-error', 'Please enter proper values');
	}
};
