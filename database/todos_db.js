import Database from 'better-sqlite3';

const db = new Database('database\\todos.db', { verbose: console.log });
db.pragma('journal_mode = WAL');

db.exec(`CREATE TABLE IF NOT EXISTS toDos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL,
    done BOOLEAN NOT NULL
);`);

export const toDos = [
	{ name: 'Next TODO', done: false },
	{ name: 'Done TODO', done: true },
];

let stmt;

stmt = db.prepare('INSERT INTO toDos (name, done) VALUES (:name, :done)');
toDos.forEach(todo =>
	stmt.run({ name: todo.name, done: `${todo.done}`.toUpperCase() })
);

const result = db.prepare(`SELECT * FROM toDos`);
console.table(result.all());

db.close();
