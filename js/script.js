let $ = document;
const inputTask = $.querySelector('#input_task');
const addTaskBtn = $.querySelector('.add_task');
const ulTag = $.querySelector('.tasks_ul');
const deleteBtn = $.querySelector('.delete');

let todosArray = [];


function addTaskFunc(event) {
    event.preventDefault();
    let newTodoTitle = inputTask.value;
    let newTodoObj = {
        id: todosArray.length + 1,
        title: newTodoTitle,
    }
    
    inputTask.value = '';

    todosArray.push(newTodoObj);
    setLocalStorage(todosArray);
    todosCreator(todosArray);
    
}

function setLocalStorage(todosList) {
    localStorage.setItem('todos',JSON.stringify(todosList));
}


function todosCreator(todosList) {
    todosList.forEach(function(item) {
        
        let newTodoLiElem = $.createElement('li');
        newTodoLiElem.className = "tasks_item";


        let spanElem = $.createElement('span');
        spanElem.innerHTML = item.title;
        

        let newTodoDeleteIcon = $.createElement('i');
        newTodoDeleteIcon.className = "fa-solid fa-trash-can delete";

        newTodoLiElem.append(spanElem, newTodoDeleteIcon);
        ulTag.append(newTodoLiElem);
        
    })
}

addTaskBtn.addEventListener('click',addTaskFunc);
