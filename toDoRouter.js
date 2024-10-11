import express from 'express';

import { addToDo, getToDosList, updateToDo, dropToDo } from './toDo.js';

const router = express.Router();

router.get('/', (req, res) => {
	setTimeout(() => {
		res.send(getToDosList());
	}, 2000); // Artificial delay to show indicator.
});

router.post('/', (req, res) => {
	res.send(
		addToDo({
			name: req.body.newToDo,
			done: false,
		})
	);
});

router.put('/:id', (req, res) => {
	res.send(updateToDo(req.params.id, req.query.done === 'false'));
});

router.delete('/:id', (req, res) => {
	res.send(dropToDo(req.params.id));
});

export default router;
