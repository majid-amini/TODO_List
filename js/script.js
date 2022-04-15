let $ = document;
const inputTask = $.querySelector('#input_task');
const addTaskBtn = $.querySelector('.add_task');
const ulElem = $.querySelector('.tasks_ul');
const deleteBtn = $.querySelector('.delete');
const addTodoForm = $.querySelector('.new_task_total');
const clearContainer = $.querySelector('.clear_tasks')
const clearBtn = $.querySelector('#clear');

addTodoForm.addEventListener('submit',function(event){
    event.preventDefault();
})

let todosArray = [];

inputTask.addEventListener('keydown',function(event){

    let newTodoValue = event.target.value.trim();
    
    if (event.keyCode === 13) {
        if (newTodoValue) {
           addNewTodo(newTodoValue);
           
        }
    }
});



function addNewTodo(newTodoValue){


    let newTodoObj = {
        id: todosArray.length +1,
        title: newTodoValue
    }
    
    todosArray.push(newTodoObj);
    setlocalStorage(todosArray);
    todosCreator(todosArray);
    
    
    let newTodoLi = $.createElement('li');
    newTodoLi.className = "tasks_item";

    inputTask.value = '';

    let newTodoTitleSpan = $.createElement('span');
    newTodoTitleSpan.className = "title-span";
    newTodoTitleSpan.innerHTML = newTodoValue;
    
    let newTodoDeleteIcon = $.createElement('i');
    newTodoDeleteIcon.className = "fa-solid fa-trash-can delete";

    newTodoDeleteIcon.addEventListener('click',function(event){
        event.target.parentElement.remove();
    })

   newTodoLi.append(newTodoTitleSpan, newTodoDeleteIcon);

    
    ulElem.append(newTodoLi);
}


function setlocalStorage(todosList) {
    localStorage.setItem('todos',JSON.stringify(todosList));
}

function todosCreator(todosList) {
    todosList.forEach(function (todo){
        // console.log(todo);
    })
}


function getLocalStorage() {
    let localStorageTodos = JSON.parse(localStorage.getItem('todos'));

    if (localStorageTodos) {
        todosArray = localStorageTodos;
    } else {
        todosArray = [];
    }
    todosCreator(todosArray);
}


window.addEventListener('load',getLocalStorage);






// clearBtn.addEventListener('click',function(event){
//     console.log(event.target.parentElement.parentElement.children)
// })

// function taskNumbers(newTodoLi) {
//     let taskInfo = document.createElement('p');
    

//     taskInfo.innerHTML = `you have ${} pending tasks`
// }