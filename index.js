import express from 'express';
import bodyParser from 'body-parser';

import { addToDo, getToDosList, updateToDo, dropToDo } from './toDo.js';

const app = express();
const PORT = process.env.PORT || 3456;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

app.get('/todos', (req, res) => {
	setTimeout(() => {
		res.send(getToDosList());
	}, 2000); // Artificial delay to show indicator.
});

app.post('/todos', (req, res) => {
	res.send(
		addToDo({
			name: req.body.newToDo,
			done: false,
		})
	);
});

app.put('/todos/:name', (req, res) => {
	res.send(updateToDo(req.params.name, req.query.done === 'false'));
});

app.delete('/todos/:id', (req, res) => {
	res.send(dropToDo(req.params.id));
});

app.listen(PORT, () => {
	console.log(`http://127.0.0.1:${PORT}`);
});
