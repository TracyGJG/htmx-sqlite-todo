import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import { engine } from 'express-handlebars';

import toDoRouter from './server/toDoRouter.js';

const app = express();
const ADDR = 'http://127.0.0.1';
const PORT = process.env.PORT || 3456;

app.set('view engine', 'hbs');
app.engine(
	'hbs',
	engine({
		extname: 'hbs',
		layoutsDir: path.join(process.cwd(), 'views', 'layouts'),
		partialsDir: path.join(process.cwd(), 'views', 'partials'),
	})
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use('/todos', toDoRouter);

app.get('/', (_req, res) => {
	res.render('main', { layout: 'index' });
});

app.listen(PORT, () => {
	console.log(`${ADDR}:${PORT}`);
});
