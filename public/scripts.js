'use strict';

function controlAddTodoButton({ target } = { target: { value: '' } }) {
	document.querySelector('[name = "addButton"]').disabled =
		!target.value.length;
}

controlAddTodoButton();

{
	const CSRF_TOKEN = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
	console.log(`Configure CSRF Token: ${CSRF_TOKEN}`);

	document.body.addEventListener('htmx:configRequest', (event) => {
		console.log(`Adding CSRF Token to request header`);
		event.detail.headers['X-CSRF-Token'] = CSRF_TOKEN;
	});
}