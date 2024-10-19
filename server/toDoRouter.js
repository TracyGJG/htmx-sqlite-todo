import path from 'path';
import express from 'express';

import { addToDo, getToDosList, updateToDo, dropToDo } from './toDoStore.js';

const router = express.Router();

router.get('/', (_req, res) => {
	setTimeout(() => {
		const toDos = getToDosList().map(toDo => ({
			...toDo,
			checked: toDo.done ? 'checked' : '',
		}));
		res.render(path.join(process.cwd(), 'views', 'partials', 'list'), {
			layout: false,
			toDos,
		});
	}, 2000); // Artificial delay to show indicator.
});

router.post('/', (req, res) => {
	const newToDo = addToDo({
		name: req.body.newToDo,
		done: false,
	});
	res.render(path.join(process.cwd(), 'views', 'partials', 'entry'), {
		layout: false,
		toDo: newToDo,
	});
});

router.put('/:id', (req, res) => {
	const updatedToDo = updateToDo(req.params.id, req.query.done === 'false');
	updatedToDo.checked = updatedToDo.done ? 'checked' : '';

	res.render(path.join(process.cwd(), 'views', 'partials', 'done'), {
		layout: false,
		toDo: updatedToDo,
	});
});

router.delete('/:id', (req, res) => {
	dropToDo(req.params.id);
	res.send();
});

export default router;
