const STORAGE_KEY = 'todosDB'
var gTodos
var gFilterBy = 'all'
var gSortBy = 'txt'

_createTodos()

function getTodosForDisplay() {

    const filtered =  gTodos.filter(todo =>
        todo && gFilterBy === 'all'||
        todo.isDone && gFilterBy === 'done' ||
        !todo.isDone && gFilterBy === 'active')


    if (gSortBy === 'txt') return filtered.sort(function (a, b) {
        if (a.txt.toLowerCase() > b.txt.toLowerCase()) return 1
        if (a.txt.toLowerCase() < b.txt.toLowerCase()) return -1
        return 0
    })

    if (gSortBy === 'createAt') return filtered.sort(function (a, b) {
       return a.createAt-b.createAt
    })

    if (gSortBy === 'importance') return filtered.sort(function (a, b) {
        return a.importance - b.importance
    })
}

function addTodo(txt, importance) {
    const todo = _createTodo(txt, importance)
    gTodos.unshift(todo)
    saveToStorage(STORAGE_KEY, gTodos)

}

function removeTodo(todoId) {
    const todoIdx = gTodos.findIndex(todo => todo.id === todoId)
    gTodos.splice(todoIdx, 1)
    saveToStorage(STORAGE_KEY, gTodos)

}

function toggleTodo(todoId) {
    const todo = gTodos.find(todo => todo.id === todoId)
    todo.isDone = !todo.isDone
    saveToStorage(STORAGE_KEY, gTodos)

}

function setFilter(filterBy) {
    gFilterBy = filterBy
}

function setSort(sortBy) {
    gSortBy = sortBy
}

function getTotalTodos() {
    return gTodos.length
}

function getActiveTodos() {
    return gTodos.filter(todo => !todo.isDone).length
}

function _createTodos() {
    gTodos = loadFromStorage(STORAGE_KEY)
    if (!gTodos || !gTodos.length) {
        gTodos = [
            _createTodo('Learn HTML'),
            _createTodo('Study CSS'),
            _createTodo('Master JS'),
        ]
        saveToStorage(STORAGE_KEY, gTodos)
    }
}

function _createTodo(txt, importance) {
    return {
        id: _makeId(),
        txt: txt,
        isDone: false,
        createAt: Date.now(),
        importance: importance
    }
}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}