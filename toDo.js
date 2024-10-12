import Database from 'better-sqlite3';

const db = new Database('todos.db', { verbose: console.log });
db.pragma('journal_mode = WAL');

// Database Functions
export function getToDosList() {
	const result = db.prepare(`SELECT * FROM toDos`).all();
	console.table(result);
	return result.map(row => ({
		id: row.id,
		name: row.name,
		done: row.done === 'TRUE',
	}));
}

export function addToDo(toDo) {
	const todo = db
		.prepare('INSERT INTO toDos (name, done) VALUES (:name, :done) Returning *')
		.all({
			name: toDo.name,
			done: `${toDo.done}`.toUpperCase(),
		})[0];
	return { ...todo, done: todo.done !== 'FALSE' };
}

export function updateToDo(id, _done) {
	const todos = db
		.prepare('UPDATE toDos SET done = :done WHERE id = :id returning *')
		.all({ id, done: `${_done}`.toUpperCase() });
	const todo = { ...todos[0], done: todos[0].done !== 'FALSE' };
	return todo;
}

export function dropToDo(toDoId) {
	const stmt = db.prepare('DELETE FROM toDos WHERE id = :id');
	stmt.run({ id: toDoId });
}
