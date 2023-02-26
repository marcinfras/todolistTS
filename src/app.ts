const categoriesContainer: HTMLElement =
  document.querySelector(".form__categories");
const tasksContainer: HTMLElement = document.querySelector(".form__tasks");
const inputText: HTMLInputElement = document.querySelector(".form__inputText");
const addBtn: HTMLButtonElement = document.querySelector(".form__btn");

const categories: string[] = ["general", "work", "hobby", "gym"];
const tasks: { id: number; name: string; category: string }[] = [
  { id: 0, name: "Wyrzucić śmieci", category: "general" },
  { id: 1, name: "Pójść na siłkę", category: "gym" },
  { id: 2, name: "Pójść do pracy", category: "work" },
];

const renderCategories = () => {
  categories.forEach((item) => {
    const category = document.createElement("li");
    category.innerHTML = `
        <input type="radio" name="category" id="${item}" ${
      item === "general" ? "checked" : ""
    }/>
        <label class="form__radioLabel" for="${item}">${item}</label>
    `;
    category.className = "form__category";
    categoriesContainer.appendChild(category);
  });
};

const renderTasks = () => {
  tasksContainer.innerHTML = "";
  tasks.forEach((item) => {
    const task = document.createElement("li");
    task.innerHTML = `${item.name}<button data-id="${item.id}" class="form__removeTask">X</button>`;
    task.className = `form__task form__task--${item.category}`;
    task.dataset.id = String(item.id);
    tasksContainer.appendChild(task);
    const removeBtns = document.querySelectorAll(".form__removeTask");
    removeBtns.forEach((btn) => {
      btn.addEventListener("click", removeTask);
    });
  });
};

const render = () => {
  renderCategories();
  renderTasks();
};

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (inputText.value === "") return;
  const newTask = {
    id: tasks.length,
    name: inputText.value,
    category: document.querySelector("input[type=radio]:checked").id,
  };
  tasks.push(newTask);
  renderTasks();
  inputText.value = "";
});

const removeTask = (e) => {
  e.preventDefault();
  const id: number = e.target.dataset.id;
  let newId: number = 0;

  console.log(id);
  tasks.splice(id, 1);
  tasks.forEach((task) => {
    task.id = newId;
    newId++;
  });
  renderTasks();
};

window.onload = render;
