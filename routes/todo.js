const express = require("express");
const router = express.Router();
const {
  getAllTodos,
  saveTodo,
  getTodoById,
  updateTitleTodoById,
  getUserTodos,
  deleteAllTodos,
} = require("../controllers/todo");
const auth = require("../middlewares/auth");





router.get("/", getAllTodos);

router.post("/", auth,saveTodo );


/* -------------------- lab ------------------- */
router.patch("/:id",auth, updateTitleTodoById);


router.get("/user",auth, getUserTodos);

router.delete("/",auth,deleteAllTodos)

/* --------------------  ------------------- */

router.get("/:id",auth,getTodoById);
module.exports = router;
