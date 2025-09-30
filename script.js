const submitSection = document.querySelector("#submit-section");
const taskInput = document.querySelector("#task-input");
const taskSection = document.querySelector("#task-section");
const tasksFromLocalStorage = JSON.parse(localStorage.getItem("myTasks"));

let myTasks = [];

if (tasksFromLocalStorage) {
  myTasks = tasksFromLocalStorage;
  render(myTasks);
}

function render(tasks) {
  let temp = "";
  for (let i = myTasks.length - 1; i >= 0; i--) {
    temp += `
    <div id="${i}" class="task-node">
      <div class="task-left">
        <input class="checkbox-node" type="checkbox" />
        <span>${tasks[i]}</span>
      </div>
      <input class="delete-task" type="image" src="/image/lixo.png" />
    </div>
    `;
  }
  taskSection.innerHTML = temp;
}

taskSection.addEventListener("change", function (e) {
  if (e.target.classList.contains("checkbox-node")) {
    const checkbox = e.target;
    const spanEl = checkbox.nextElementSibling;
    
    spanEl.classList.toggle("completed", checkbox.checked);
  }
});

taskSection.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-task")) {
    e.target.parentNode.remove();
    myTasks.splice(e.target.parentNode.id, 1);
    localStorage.setItem("myTasks", JSON.stringify(myTasks));
    render(myTasks);
  }
});

submitSection.addEventListener("submit", function () {
  if (taskInput.value === "") return;
  myTasks.push(taskInput.value);
  taskInput.value = "";
  localStorage.setItem("myTasks", JSON.stringify(myTasks));
  render(myTasks);
});
