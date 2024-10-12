import express from 'express';

import { addToDo, getToDosList, updateToDo, dropToDo } from './toDo.js';

import { toDoDone, toDoEntry, toDosList } from './toDoViews.js';

const router = express.Router();

router.get('/', (_req, res) => {
	setTimeout(() => {
		const toDos = toDosList(getToDosList());
		res.send(toDos);
	}, 2000); // Artificial delay to show indicator.
});

router.post('/', (req, res) => {
	const newToDo = addToDo({
		name: req.body.newToDo,
		done: false,
	});
	res.send(toDoEntry(newToDo));
});

router.put('/:id', (req, res) => {
	const updatedToDo = updateToDo(req.params.id, req.query.done === 'false');
	res.send(toDoDone(updatedToDo));
});

router.delete('/:id', (req, res) => {
	dropToDo(req.params.id);
	res.send();
});

export default router;
