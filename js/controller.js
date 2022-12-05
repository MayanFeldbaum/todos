
function onInit() {
    renderTodos()
}

function renderTodos() {

    const todos = getTodosForDisplay()
    const strHTMLs = todos.map(todo => `
    <li class="${(todo.isDone) ? "done" : ""}"
         onclick="onToggleTodo('${todo.id}')">
         ${todo.txt}
        <button onclick="onRemoveTodo(event,'${todo.id}')">x</button> 
    </li>` )

    document.querySelector('.todo-list').innerHTML = strHTMLs.join('')

    // var getTotalTodos = (!getTotalTodos()) ? getTotalTodos() : 'No Done Todos'
    document.querySelector('.total-todos').innerText = (!getTotalTodos()) ? 'No Todos': getTotalTodos()
    document.querySelector('.active-todos').innerText = (!getActiveTodos())?'No Active Todos':getActiveTodos()
}

function onAddTodo(ev) {
    ev.preventDefault()
    const elTxt = document.querySelector('input[name="todo-txt"]')
    const txt = elTxt.value
    const elImportance = document.querySelector('input[name="todo-importance"]')
    const importance = elImportance.value
    if (!txt.length||!importance.length||importance<1||importance>3) return
    else{
    addTodo(txt,importance)
    elTxt.value = ''
    elImportance.value = ''
    renderTodos()
    }

}

function onRemoveTodo(ev, todoId) {
    ev.stopPropagation()
    if (confirm("Are you sure?")){
    removeTodo(todoId)
    renderTodos()
    }
    return
}

function onToggleTodo(todoId) {
    toggleTodo(todoId)
    renderTodos()
}

function onSetFilter(filterBy) {
    setFilter(filterBy)
    renderTodos()
}

function onSetSort(sortBy) {
    setSort(sortBy)
    renderTodos()
}

