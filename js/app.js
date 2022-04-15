let $ = document;
const inputTask = $.querySelector('#input_task');
const addBtn = $.querySelector('.add_task');
const ulElement = $.querySelector('.tasks_ul');
const clearBtn = $.querySelector('#clear');
const formElem = $.querySelector('.new_task_total');

let todosArray = [];

// formElem.addEventListener('submit',function(event){
//     event.preventDefault();
// })

addBtn.addEventListener('click',function(event){
    event.preventDefault();

    let inputTaskValue = inputTask.value;

    let newTodoObj = {
        id: todosArray.length +1,
        title: inputTaskValue
    }

    inputTask.value = '';

    todosArray.push(newTodoObj);
    setLocalStorage(todosArray);
    todosGenerator(todosArray);
    tasksCounter();
    
})



function setLocalStorage(todosList){
    localStorage.setItem('todos',JSON.stringify(todosList));
    
}

function todosGenerator(todosList) {

    ulElement.innerHTML = '';

    todosList.forEach(function(todo){     
    let newTodoLiElem = document.createElement('li');
    newTodoLiElem.className = "tasks_item";

    let newTodoSpanElem = document.createElement('span');
    newTodoSpanElem.innerHTML = todo.title;
    newTodoSpanElem.className = "title-span";

    let newTodoDeleteBtn = document.createElement('i');
    newTodoDeleteBtn.className = "fa-solid fa-trash-can delete";

    newTodoLiElem.append(newTodoSpanElem, newTodoDeleteBtn);
    ulElement.append(newTodoLiElem);

    newTodoDeleteBtn.addEventListener('click',function(event){
    
        event.target.parentElement.remove();
        removeItemlocalStorage(event.target.parentElement);
    })
    
    
    }) 
}


function getLocalStorage(){
    let localStorageTodos = JSON.parse(localStorage.getItem('todos'));
    if (localStorageTodos) {
        todosArray = localStorageTodos
    } else {
        todosArray = []
    }

    todosGenerator(todosArray);
    tasksCounter();
}

function removeItemlocalStorage(id) {
    let localStorageTodos = JSON.parse(localStorage.getItem('todos'));
    
    let removeItem =id.children[0].textContent;
    
    todosArray = localStorageTodos.filter(item => item.title != removeItem);
    
    setLocalStorage(todosArray);
    tasksCounter();
}

function tasksCounter() {
    $.querySelector('.clear_tasks span').innerHTML = todosArray.length; 
}


function clearTodos () {
    todosArray = [];
    todosGenerator(todosArray);
    localStorage.clear();
    localStorage.removeItem('todos');
    tasksCounter();
}

window.addEventListener('load',getLocalStorage);
clearBtn.addEventListener('click', clearTodos);




