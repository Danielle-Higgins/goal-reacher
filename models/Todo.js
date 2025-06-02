const mongoose = require("mongoose");

// creating the blueprint of our documents
const TodoSchema = new mongoose.Schema({
  todo: { type: String, required: true },
  completed: { type: Boolean, required: true },
  userId: { type: String, required: true },
});

// mongodb will automatically create a todos collection
module.exports = mongoose.model("Todo", TodoSchema);
