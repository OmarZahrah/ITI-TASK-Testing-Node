const todosModel = require("../models/todo");
const APIError = require("../utilities/errors");

const getAllTodos = async (_req, res, _next) => {
  const todos = await todosModel.find();
  res.status(200).json({ data: todos });
};

const saveTodo = async (req, res, _next) => {
  const title = req.body.title;

  const newTodo = await await todosModel.create({
    title: title,
    userId: req.id,
  });
  res.status(201).json({ data: newTodo });
};

const getTodoById = async (req, res, _next) => {
  const { id } = req.params;

  const todo = await todosModel.findOne({ _id: id });
  if (!todo) {
    throw new APIError(404, "there is no todo with this id");
  } else {
    res.status(200).json({ data: todo });
  }
};

/* -------------------- lab ------------------- */

/** update todo by id **/
const updateTitleTodoById = async (req, res, _next) => {
  const { title } = req.body;
  const { id } = req.params;

  if (!id || !title) {
    throw new APIError(400, "must provide title and id to edit todo");
  } else {
    const UpdatedTodo = await todosModel.findOneAndUpdate(
      { _id: id },
      { title },
      { new: true },
    );
    res.status(200).json({ data: UpdatedTodo });
  }
};

/** get all todos for the logged user=> by id in token **/
const getUserTodos = async (req, res, _next) => {
  const todos = await todosModel.find({ userId: req.id });
  res
    .status(200)
    .json(
      todos.length != 0
        ? { data: todos }
        : { message: "Couldn't find any todos for this user" },
    );
};

const deleteAllTodos = async (_req, res, _next) => {
  await todosModel.deleteMany();
  res.status(200).json({ message: "todos have been deleted successfully" });
};

module.exports = {
  getAllTodos,
  saveTodo,
  getTodoById,
  updateTitleTodoById,
  deleteAllTodos,
  getUserTodos,
};
