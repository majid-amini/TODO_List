let $ = document
const inputElem = $.querySelector('#input_task');
const addButton = $.querySelector('.add_task');
const clearBtn = $.querySelector('#clear');
const ulElem = $.querySelector('.tasks_ul');
const submitForm = $.querySelector ('.new_task_total');

let todosArray = []

function addNewTodo () {
    let newTodoTitle = inputElem.value

    let newTodoObj = {
        id: todosArray.length + 1,
        title: newTodoTitle
    }

    inputElem.value = '';

    todosArray.push(newTodoObj)
    setLocalStorage(todosArray)
    todosGenerator(todosArray)


   
    // inputElem.focus()
}

function setLocalStorage (todosList) {
    localStorage.setItem('todos', JSON.stringify(todosList))
}

function todosGenerator (todosList) {

    let  newTodoLiElem, newTodoSpanElem, newTodoDeleteBtn

    ulElem.innerHTML = ''

    todosList.forEach(function (todo) {
        
        newTodoLiElem = $.createElement('li');
        newTodoLiElem.className = 'tasks_item';

        newTodoSpanElem = $.createElement('span');
        newTodoSpanElem.className = "title-span";
        newTodoSpanElem.innerHTML = todo.title;
        
        newTodoDeleteBtn = $.createElement('i');
        newTodoDeleteBtn.className = 'fa-solid fa-trash-can delete'
    

        newTodoLiElem.append(newTodoSpanElem, newTodoDeleteBtn)

        ulElem.append(newTodoLiElem)

        newTodoDeleteBtn.addEventListener('click',function(event){
           event.target.parentElement.remove();
            
        })
    
    })
}

function getLocalStorage () {
    let localStorageTodos = JSON.parse(localStorage.getItem('todos'))

    if (localStorageTodos) {
        todosArray = localStorageTodos
    } else {
        todosArray = []
    }

    todosGenerator(todosArray);

}

function clearTodos () {
    todosArray = []
    todosGenerator(todosArray)
    localStorage.clear()
    localStorage.removeItem('todos')
}


window.addEventListener('load', getLocalStorage);
addButton.addEventListener('click', addNewTodo);
clearBtn.addEventListener('click', clearTodos);
inputElem.addEventListener('keydown', function (event) {
    
    if (event.code === 'Enter') {
        addNewTodo()
    }
})




submitForm.addEventListener('submit',function(event){
    event.preventDefault();
})