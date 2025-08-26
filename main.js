"use strict";
console.log("Ready Tania AdaTask");

let tasksContainer = document.querySelector(".container-tasks_tasks-list");

const savedTasks = localStorage.getItem("tasks");            /* Esta linea sirve para obtener lo guardado en Local Storage */
let tasks = savedTasks ? JSON.parse(savedTasks) : [       /* con este ternario consigo que revise si hay algo en Local Storage y lo pinte junto con las tareas del array original */
      {name: "Tarea de prueba", completed: true, id: 1},
      {name: "Tarea de pueba 2", completed: true, id: 2},
    ];

/* Lógica para crear la estructura de las tareas (<li>) */
const listTasks = (tasks) => {
  tasksContainer.innerHTML = "";

  tasks.forEach((task) => {
    const newTask = document.createElement("li");
    const newContentTask = document.createTextNode(task.name);
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.id = task.id;
    const deleteBtn = document.createElement("delete-button");
    deleteBtn.textContent= "🗑️"; 
    deleteBtn.title= "Borrar tarea";                /* Con esto hacemos que al hacer hover muestre este texto de ayuda */
    deleteBtn.classList.add("delete")
    deleteBtn.id = task.id;
    newTask.appendChild(checkbox);
    newTask.appendChild(newContentTask);
    newTask.appendChild(deleteBtn);
    tasksContainer.appendChild(newTask);
    if (task.completed) {
      newTask.classList.add("completed");
    }
  });
};
listTasks(tasks);

/* Lógica para tachar las tareas cuando están realizadas Y TAMBIÉN PARA BORRARLAS ya que el botón creado en JS no es válido para escuchar eventos porque es dinámico, es decir, se crea con cada tarea, de manera que al igual que el checkbox, lo que haremos es escuchar al contenedor y después, discriminar qué hijo ha sido pulsado */

const handleListClick = (event) => {
  if (event.target.type === 'checkbox') {                           /* Esta es la parte de tachar las tareas completadas */
  const taskId = parseInt(event.target.id);
  const indexTask = tasks.findIndex((task) => task.id === taskId);
  tasks[indexTask].completed = !tasks[indexTask].completed;
  }
  else if (event.target.classList.contains("delete")) {             /* Aquí borra tareas ---> busca el elem. con la clase delete */
    const taskId = parseInt (event.target.id);
    tasks = tasks.filter (task => task.id !== taskId)        /* La manera de borrar es filtrar el array sin la tarea que borramos */
  }
  listTasks(tasks);                                           /* Renderizamos la lista de nuevo en el DOM, pero actualizada */
  localStorage.setItem("tasks", JSON.stringify(tasks));             /* Sirve para actualizar en Local Storage la tarea */
  

}

tasksContainer.addEventListener("click", handleListClick);

/* Lógica para añadir tareas a través del formulario */
const inputAdd = document.querySelector(".form-input_add");
const btnAdd = document.querySelector(".form-btn_submit");

const handleClickAdd = (event) => {
  event.preventDefault();
  const newTask = {
    name: inputAdd.value,
    id: tasks.length + 1,
    completed: false,
  };
  tasks.push(newTask);
  inputAdd.value = "";
  listTasks(tasks);
  localStorage.setItem("tasks", JSON.stringify(tasks));               /* Sirve para guardar en Local Storage la nueva tarea */
};

btnAdd.addEventListener("click", handleClickAdd);

/* Lógica para buscar tareas a través del formulario de búsqueda */

const searchInput = document.querySelector(".form-tasks_input");
const searchBtn = document.querySelector(".form-tasks_button");
const searchForm = document.querySelector(".container-tasks_form-tasks");

const handleClickSearch = (event) => {
  event.preventDefault();
  const textToSearch = searchInput.value.toLowerCase();
  const findTask = tasks.filter((task) =>
    task.name.toLowerCase().includes(textToSearch));
  listTasks(findTask);
};

searchForm.addEventListener("submit", handleClickSearch);



