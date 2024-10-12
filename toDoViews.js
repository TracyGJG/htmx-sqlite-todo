// Template Functions
export const toDoDone = toDo => /*html*/ `
<input
    type="checkbox"
    id="TODO_${toDo.id}"
    name="${toDo.name}"
    ${toDo.done ? 'checked' : ''}
    hx-put="/todos/${toDo.id}?done=${toDo.done}"
    hx-swap="outerHTML"
    hx-indicator=".htmx-indicator"/>`;

export const toDoEntry = toDo => /*html*/ `<li>
  ${toDoDone(toDo)}
  <label for="TODO_${toDo.id}">${toDo.name}</label>
  <button hx-delete="/todos/${toDo.id}"
  hx-target="closest li" 
  hx-swap="outerHTML">del</button>
</li>`;

export const toDosList = toDos => toDos.map(toDoEntry).join('');
