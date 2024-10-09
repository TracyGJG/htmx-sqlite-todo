import Database from "better-sqlite3";

const db = new Database("todos.db", { verbose: console.log });
db.pragma("journal_mode = WAL");

// Template Functions
export const toDoDone = (toDo) => /*html*/ `
<input
    type="checkbox"
    id="${toDo.name}"
    name="${toDo.name}"
    ${toDo.done ? "checked" : ""}
    hx-put="/todos/${toDo.name}?done=${toDo.done}"
    hx-swap="outerHTML"
    hx-indicator=".htmx-indicator"/>`;

const toDoEntry = (toDo) => /*html*/ `<li>
  ${toDoDone(toDo)}
  <label for="${toDo.name}">${toDo.name}</label>
  <button hx-delete="/todos/${toDo.name}" hx-target="closest li">del</button>
</li>`;

// Database Functions
const getAllToDos = () => {
  const result = db.prepare(`SELECT * FROM toDos`).all();

  return result.map((row) => ({
    name: row.name,
    done: row.done === "TRUE",
  }));
};

export function getToDosList() {
  return getAllToDos().map(toDoEntry).join("");
}

export function addToDo(toDo) {
  const stmt = db.prepare(
    "INSERT INTO toDos (name, done) VALUES (:name, :done)"
  );
  stmt.run({ name: toDo.name, done: `${toDo.done}`.toUpperCase() });
  getAllToDos();
  return toDoEntry(toDo);
}

export function updateToDo(name, _done) {
  const stmt = db.prepare("UPDATE toDos SET done = :done WHERE name = :name");
  stmt.run({ name, done: `${_done}`.toUpperCase() });
  return toDoDone({ name, done: _done });
}

export function dropToDo(toDoName) {
  const stmt = db.prepare("DELETE FROM toDos WHERE name = :name");
  stmt.run({ name: toDoName });
}
