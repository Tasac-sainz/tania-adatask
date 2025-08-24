'use strict'
console.log("Ready Tania AdaTask");

const tasksContainer=document.querySelector ('.container-tasks_tasks-list');

const tasks = [
  { name: "Recoger setas en el campo", completed: true, id: 1 },
  { name: "Comprar pilas", completed: true, id: 2 },
  { name: "Poner una lavadora de blancos", completed: true, id: 3 },
  { name: "Aprender cómo se realizan las peticiones al servidor en JavaScript", completed: false, id: 4,},
];


const listTasks = () => {
    for (const task of tasks) {
    const newTask= document.createElement("li");
    const newContentTask= document.createTextNode (task.name);
    const checkbox= document.createElement ("input");
    checkbox.type="checkbox";
    checkbox.checked= task.completed;
    checkbox.id= task.id;
    newTask.appendChild(checkbox);
    newTask.appendChild(newContentTask);
    tasksContainer.appendChild(newTask);
    
    if (task.completed) {
        newTask.classList.add("completed")
    };
}}
listTasks();

const handleListClick = (event) => {
    const taskId= parseInt(event.target.id);
    if (!taskId) {
        return;
    }
    const selectTask= tasks.find(task => task.id === taskId); 
    if (selectTask) 
    tasks.completed= event.target.checked;
    
    };

tasksContainer.addEventListener("click", handleListClick);