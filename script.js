const submitSection = document.querySelector("#submit-section");
const taskInput = document.querySelector("#submit-input");
const taskSection = document.querySelector("#task-section");

// Acesso as tarefas do armazenamento local (dados salvos no navegador)
const tasksFromLocalStorage = JSON.parse(localStorage.getItem("myTasks")) || [];

let myTasks = [];

// Atribuir e renderizar se houver tarefas armazenadas localmente
myTasks = tasksFromLocalStorage;
render(myTasks);

// Renderizar todas as tarefas na página
function render(tasks) {
  taskSection.innerHTML = "";
  for (let i = tasks.length - 1; i >= 0; i--) {
    const task = tasks[i];
    taskSection.innerHTML += `
      <div data-id="${i}" class="task-node">
        <div class="task-left">
          <input class="checkbox-node" type="checkbox" ${
            task.completed ? "checked" : ""
          }/>
          <span class="${task.completed ? "completed" : ""}">${task.text}</span>
        </div>
        <input class="delete-task" type="image" src="/images/lixo.png" />
      </div>
    `;
  }
}

// Atualizar o armazenamento local
function updateLocalStorage() {
  localStorage.setItem("myTasks", JSON.stringify(myTasks));
}

// Verificar se a tarefa foi finalizada
taskSection.addEventListener("change", function (e) {
  if (e.target.classList.contains("checkbox-node")) {
    const taskNode = e.target.closest(".task-node");
    const id = taskNode.dataset.id;
    myTasks[id].completed = e.target.checked;
    updateLocalStorage();
    render(myTasks);
  }
});

// Deletar tarefa
taskSection.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-task")) {
    const taskNode = e.target.closest(".task-node");
    const id = taskNode.dataset.id;
    myTasks.splice(id, 1);
    updateLocalStorage();
    render(myTasks);
  }
});

// Adicionar tarefa
submitSection.addEventListener("submit", function (e) {
  e.preventDefault();
  if (taskInput.value === "") return;
  myTasks.push({ text: taskInput.value.trim(), completed: false });
  taskInput.value = "";
  updateLocalStorage();
  render(myTasks);
});

// TEMAS
const themeToggle = document.querySelector("#theme-toggle");
let lightMode = localStorage.getItem("lightMode") || "disabled";

if (lightMode == "enabled") {
  themeToggle.src = "/images/dark_mode-icon.png";
  document.body.classList.toggle("light-mode");
}

// Botão para trocar tema
themeToggle.addEventListener("click", function () {
  lightMode = localStorage.getItem("lightMode");
  document.body.classList.toggle("light-mode");
  if (lightMode == "enabled") {
    localStorage.setItem("lightMode", "disabled");
    themeToggle.src = "/images/light_mode-icon.png";
  } else {
    localStorage.setItem("lightMode", "enabled");
    themeToggle.src = "/images/dark_mode-icon.png";
  }
});
