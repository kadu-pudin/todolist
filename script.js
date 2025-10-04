const submitSection = document.querySelector("#submit-section");
const taskInput = document.querySelector("#task-input");
const taskSection = document.querySelector("#task-section");
const tasksFromLocalStorage = JSON.parse(localStorage.getItem("myTasks")) || [];

let myTasks = [];

myTasks = tasksFromLocalStorage;
render(myTasks);

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
        <input class="delete-task" type="image" src="/image/lixo.png" />
      </div>
    `;
  }
}

function updateLocalStorage() {
  localStorage.setItem("myTasks", JSON.stringify(myTasks));
}

taskSection.addEventListener("change", function (e) {
  if (e.target.classList.contains("checkbox-node")) {
    const taskNode = e.target.closest(".task-node");
    const id = taskNode.dataset.id;
    myTasks[id].completed = e.target.checked;
    updateLocalStorage();
    render(myTasks);
  }
});

taskSection.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-task")) {
    const taskNode = e.target.closest(".task-node");
    const id = taskNode.dataset.id;
    myTasks.splice(id, 1);
    updateLocalStorage();
    render(myTasks);
  }
});

submitSection.addEventListener("submit", function () {
  if (taskInput.value === "") return;
  myTasks.push({ text: taskInput.value.trim(), completed: false });
  taskInput.value = "";
  updateLocalStorage();
  render(myTasks);
});
