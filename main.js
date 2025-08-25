'use strict'
console.log("Ready Tania AdaTask");

const tasksContainer=document.querySelector ('.container-tasks_tasks-list');

const tasks = [
  { name: "Recoger setas en el campo", completed: true, id: 1 },
  { name: "Comprar pilas", completed: true, id: 2 },
  { name: "Poner una lavadora de blancos", completed: true, id: 3 },
  { name: "Aprender cómo se realizan las peticiones al servidor en JavaScript", completed: false, id: 4,},
];


/* Lógica para tachar/no tachar las tareas en función de si están o no realizadas */
const listTasks = (tasks) => {
    tasksContainer.innerHTML="";

    tasks.forEach ((task) => {
    const newTask= document.createElement("li");
    const newContentTask= document.createTextNode (task.name);
    const checkbox= document.createElement ("input");
    checkbox.type="checkbox";
    checkbox.checked= task.completed;
    checkbox.id= task.id;
    newTask.appendChild(checkbox);
    newTask.appendChild(newContentTask);
    tasksContainer.appendChild(newTask);
    if (task.completed){
        newTask.classList.add("completed");
    }
    
})};
listTasks(tasks);


const handleListClick = (event) => {
    const taskId= parseInt(event.target.id);
    const indexTask = tasks.findIndex((task) => task.id === taskId);
    tasks[indexTask].completed = !tasks[indexTask].completed;
    listTasks(tasks)
};

tasksContainer.addEventListener("click", handleListClick);

/* Lógica para añadir tareas a través del formulario */
const inputAdd= document.querySelector('.form-input_add');
const btnAdd= document.querySelector ('.form-btn_submit');

const handleClickAdd = (event) => {
    event.preventDefault();
    const newTask= {
        name: inputAdd.value,
        id: tasks.length + 1,
        completed: false
    }
    tasks.push (newTask);
    inputAdd.value="";
    listTasks(tasks);
};

btnAdd.addEventListener("click", handleClickAdd);

