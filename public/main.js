const todoItem = document.querySelectorAll(".todo-text.not");
const todoComplete = document.querySelectorAll(".todo-text.completed");
const deleteBtn = document.querySelectorAll(".del-btn");

todoItem.forEach((el) => {
  // clicking on todo with class of not
  el.addEventListener("click", (e) => markComplete(e));
});

todoComplete.forEach((el) => {
  el.addEventListener("click", (e) => markIncomplete(e));
});

deleteBtn.forEach((el) => {
  el.addEventListener("click", (e) => deleteTodo(e));
});

async function markComplete(e) {
  const todoId = e.target.parentNode.dataset.id;

  try {
    const response = await fetch("todos/markComplete", {
      method: "put",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        todoIdFromJSFile: todoId,
      }),
    });

    const data = await response.json();
    console.log(data);
    location.reload(); // refresh the page
  } catch (err) {
    console.log(err);
  }
}

async function markIncomplete(e) {
  const todoId = e.target.parentNode.dataset.id;

  try {
    const response = await fetch("todos/markIncomplete", {
      method: "put",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        todoIdFromJSFile: todoId,
      }),
    });

    const data = await response.json();
    console.log(data);
    location.reload(); // refresh the page
  } catch (err) {
    console.log(err);
  }
}

async function deleteTodo(e) {
  const todoId = e.target.parentNode.parentNode.dataset.id;
  //   console.log(e.target)

  try {
    const response = await fetch("todos/deleteTodo", {
      method: "delete",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        todoIdFromJSFile: todoId,
      }),
    });

    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}
