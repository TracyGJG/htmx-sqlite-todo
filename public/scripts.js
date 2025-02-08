'use strict';

function controlAddTodoButton({ target } = { target: { value: '' } }) {
	document.querySelector('[name = "addButton"]').disabled =
		!target.value.length;
}

controlAddTodoButton();
