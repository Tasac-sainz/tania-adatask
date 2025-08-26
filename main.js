'use strict'
console.log("Ready Tania AdaTask");

const tasksContainer=document.querySelector ('.container-tasks_tasks-list');

const savedTasks= localStorage.getItem ("tasks");                   /* Esta linea sirve para obtener lo guardado en Local Storage */
const tasks = savedTasks ? JSON.parse(savedTasks) : [              /* con este ternario consigo que revise si hay algo en Local Storage y lo pinte junto con las tareas del array original */
  { name: "Preparar ruta de senderismo del próximo fin de semana", completed: true, id: 1 },
  { name: "Comprar pilas", completed: true, id: 2 },
  { name: "Terminar proyecto final", completed: true, id: 3 },
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
    localStorage.setItem('tasks', JSON.stringify(tasks));                  /* Sirve para actualizar en Local Storage la tarea */
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
    localStorage.setItem('tasks', JSON.stringify(tasks));        /* Sirve para guardar en Local Storage la nueva tarea */
};

btnAdd.addEventListener("click", handleClickAdd);

/* Lógica para buscar tareas a través del formulario de búsqueda */

const searchInput= document.querySelector('.form-tasks_input');
const searchBtn= document.querySelector('.form-tasks_button');
const searchForm= document.querySelector('.container-tasks_form-tasks')

const handleClickSearch = (event) => {
    event.preventDefault();
    const textToSearch= searchInput.value.toLowerCase();
    const findTask= tasks.filter(task => task.name.toLowerCase().includes(textToSearch));
        listTasks(findTask);
    };

searchForm.addEventListener("submit", handleClickSearch);
