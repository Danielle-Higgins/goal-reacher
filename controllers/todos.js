const Todo = require("../models/Todo");

// get the todos and pass them into the rendering
exports.getTodos = async (req, res) => {
  // console.log(req.user);
  try {
    // get documents from database
    const todoItems = await Todo.find({ userId: req.user.id });

    // count the number of docs that have the completed property set to false
    const itemsLeft = await Todo.countDocuments({
      userId: req.user.id,
      completed: false,
    });

    // render the page
    res.render("todos.ejs", {
      todos: todoItems,
      left: itemsLeft,
      user: req.user,
    });
  } catch (err) {
    console.log(err);
  }
};

// create the todo and insert into DB
exports.createTodo = async (req, res) => {
  try {
    // create the document to insert in db
    await Todo.create({
      todo: req.body.todoItem,
      completed: false,
      userId: req.user.id,
    });

    console.log("Todo has been added!");

    res.redirect("/todos"); // refresh
  } catch (err) {
    console.log(err);
  }
};

exports.markComplete = async (req, res) => {
  try {
    // update completed property to true
    await Todo.findOneAndUpdate(
      { _id: req.body.todoIdFromJSFile },
      { completed: true }
    );

    console.log("Marked Complete");
    res.json("Marked Complete");
  } catch (err) {
    console.log(err);
  }
};

exports.markIncomplete = async (req, res) => {
  try {
    // update completed property to false
    await Todo.findOneAndUpdate(
      { _id: req.body.todoIdFromJSFile },
      { completed: false }
    );

    console.log("Marked Incomplete");
    res.json("Marked Incomplete");
  } catch (err) {
    console.log(err);
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    // delete todo by its id
    await Todo.findOneAndDelete({ _id: req.body.todoIdFromJSFile });
    console.log("Deleted Todo");
    res.json("Deleted It");
  } catch (err) {
    console.log(err);
  }
};
