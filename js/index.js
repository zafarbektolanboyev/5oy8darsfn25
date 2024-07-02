const todoInput = document.getElementById('todo');
const addBtn = document.getElementById('addBtn');
const todoWrapper = document.getElementById('wrapper');
const block = document.querySelectorAll('.block')

function creatItem(value, id){
    return `
        <div class="block">
                <h5>${value}</h5>
                <div class="buttons">
                    <button data-id='${id}' class="deleteBtn">Delete</button>
                    <button class="edit">Edit</button>
                </div>
        </div>
    `   
}
function validate(){
    const todo = todoInput.value; 
    if(typeof todo != 'string'){
        return false;
    }
    if(todo.length < 5){
        alert("Eng kamida 6ta belgidan iborat bo'lsin");
        todoInput.focus();
        todoInput.style.outlineColor = 'red'
        return false;
    }
    return true;
}
function saveItemLocalStorage(value){
    const todo = {
        name: value,
        id:Date.now()
    }
    let data =[];   
    if(localStorage.getItem('todos')){
        data = JSON.parse(localStorage.getItem('todos'))
    } 
    data.push(todo);
    localStorage.setItem('todos', JSON.stringify(data))

    const item = creatItem(todo.value, todoInput.id);
    wrapper.innerHTML += item;
    window.location.reload()
}
addBtn.addEventListener('click', function(event){
    event.preventDefault();
    const todo = todoInput.value; 
    const isValid = validate();
    if(!isValid){
        return
    }
    const item = creatItem(todo);
    todoWrapper.innerHTML += item;
    saveItemLocalStorage(todoInput.value);
    todoInput.focus()
    todoInput.value = ''; 
})
document.addEventListener('DOMContentLoaded', function(){
    let data = [];
    if(localStorage.getItem('todos')){
        data = JSON.parse(localStorage.getItem('todos'))
    }
    if(data.length > 0){
        data.forEach(function(value){
            const item = creatItem(value.name, value.id)
            wrapper.innerHTML += item;
        })
    }

    const deleteBtn = document.querySelectorAll('.deleteBtn');
    deleteBtn.length > 0 && deleteBtn.forEach(function(element){
        element.addEventListener('click', function(event){
            event.preventDefault();
            let isDelete = confirm('Rostdanam o`chirasanmi');
            if(isDelete){
                let deleteId = this.getAttribute('data-id');
                let copied = JSON.parse(JSON.stringify(data));
                copied = copied.filter(function(del){
                    return del.id != deleteId
                })
                localStorage.setItem('todos', JSON.stringify(copied))
                window.location.reload()
            }
        })
    })
})