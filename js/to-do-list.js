const todoList = JSON.parse(localStorage.getItem('List'))|| [];

renderToDoList();

document.querySelector('.add-button').addEventListener('click',() =>{
    additem();
    setTimeout(()=>{
        document.querySelector('.task-status').innerHTML = '';
    },1500);
});

function renderToDoList(){
    let listItem = '';

    const html1 = `
            <div> Name </div>
            <div>Due Date</div>
            <div>Status</div>
            <div>Action</div>    
        `;

    listItem += html1;

    for(let i=0;i<todoList.length;i++){
        const todo = todoList[i];
        const name = todo.name; 
        const dueDate = todo.dueDate || 'No due date';

        let html = `
            <div>${name} </div>
            <div>${dueDate}</div>
            <div class="status">Pending</div>
            <div> 
                <button class="delete-button">Delete</button>   
                <button class="js-complete-button complete-button">Complete</button>
            </div> 
        `;
        listItem += html;
    }
    localStorage.setItem('List',JSON.stringify(todoList));
    document.querySelector('.to-do-item').innerHTML = `${listItem}`;


    let statusElemenet = document.querySelectorAll('.status');

    document.querySelectorAll('.js-complete-button')
        .forEach((completeButton,index) => {
            completeButton.addEventListener('click',() => {
                statusElemenet[index].innerHTML = 'Completed!!'
            });
        });

    document.querySelectorAll('.delete-button')
        .forEach((deleteButton,index)=>{ 
            deleteButton.addEventListener('click',()=>{
                todoList.splice(index,1);
                renderToDoList();
            });
        });
}

function additem(){
    const inputElement = document.querySelector('.js-todo-name');
    const duedateElement = document.querySelector('.todo-date');

    const name = inputElement.value;
    const dueDate = duedateElement.value;

    if(!name){
        document.querySelector('.task-status').innerHTML = `Please Enter a task`;
        return;
    }
    todoList.push({name,dueDate});
    localStorage.setItem('List',JSON.stringify(todoList));
    inputElement.value = '';
    renderToDoList();
    document.querySelector('.task-status').innerHTML = `Task added successfully !!`;

}