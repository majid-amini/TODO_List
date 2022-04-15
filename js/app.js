let $ = document;
const inputTask = $.querySelector('#input_task');
const addBtn = $.querySelector('.add_task');
const ulElement = $.querySelector('.tasks_ul');
const clearBtn = $.querySelector('#clear');
const clearTaskDiv = $.querySelector('.clear_tasks');
const formElem = $.querySelector('.new_task_total');

let todosArray = [];

formElem.addEventListener('submit',function(event){
    event.preventDefault();
})



addBtn.addEventListener('click',addTask);
   

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
   let liCounter =  $.querySelector('.clear_tasks span');
   liCounter.innerHTML = todosArray.length; 
   liCounter.style.color = "red";
   liCounter.style.fontWeight = "bold";
   liCounter.style.fontSize = "1.5rem";
   liCounter.style.textShadow = "0.1rem 0.2rem 0.2rem #000";
   liCounter.style.backgroundColor = "#ccc";
   liCounter.style.borderRadius = "50%";
   liCounter.style.padding = "1rem";
   
   if (liCounter.innerHTML == 0) {
       clearTaskDiv.style.display = 'none';
   } else {
       clearTaskDiv.style.display = 'flex';
   }

}


function clearTodos () {
    todosArray = [];
    todosGenerator(todosArray);
    localStorage.removeItem('todos');
    tasksCounter();
}


function addTask (event) {

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

    inputTask.focus();
}
window.addEventListener('load',getLocalStorage);
clearBtn.addEventListener('click', clearTodos);
inputTask.addEventListener('keydown', function(event){
    if (event.code === "Enter") {
        addTask();
    }
})




