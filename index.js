import express from 'express';
import bodyParser from 'body-parser';

import toDoRouter from './toDoRouter.js';

const app = express();
const PORT = process.env.PORT || 3456;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

app.use('/todos', toDoRouter);

app.listen(PORT, () => {
	console.log(`http://127.0.0.1:${PORT}`);
});
