import Database from 'better-sqlite3';

const db = new Database('todos.db', { verbose: console.log });
db.pragma('journal_mode = WAL');

// Template Functions
export const toDoDone = toDo => /*html*/ `
<input
    type="checkbox"
    id="${toDo.id}"
    name="${toDo.name}"
    ${toDo.done ? 'checked' : ''}
    hx-put="/todos/${toDo.id}?done=${toDo.done}"
    hx-swap="outerHTML"
    hx-indicator=".htmx-indicator"/>`;

const toDoEntry = toDo => /*html*/ `<li>
  ${toDoDone(toDo)}
  <label for="${toDo.name}">${toDo.name}</label>
  <button hx-delete="/todos/${toDo.id}" hx-target="closest li">del</button>
</li>`;

// Database Functions
export function getToDosList() {
	const result = db.prepare(`SELECT * FROM toDos`).all();
	console.table(result);
	return result
		.map(row =>
			toDoEntry({
				id: row.id,
				name: row.name,
				done: row.done === 'TRUE',
			})
		)
		.join('');
}

export function addToDo(toDo) {
	const stmt = db.prepare(
		'INSERT INTO toDos (name, done) VALUES (:name, :done) Returning RowId'
	);
	toDo.id = stmt.run({
		name: toDo.name,
		done: `${toDo.done}`.toUpperCase(),
	}).lastInsertRowid;
	return toDoEntry(toDo);
}

export function updateToDo(id, _done) {
	const stmt = db.prepare(
		'UPDATE toDos SET done = :done WHERE id = :id Returning name'
	);
	const name = stmt.run({ id, done: `${_done}`.toUpperCase() });
	return toDoDone({ id, name, done: _done });
}

export function dropToDo(toDoId) {
	const stmt = db.prepare('DELETE FROM toDos WHERE id = :id');
	stmt.run({ id: toDoId });
}
