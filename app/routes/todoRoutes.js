const express = require("express");
const handle = require("../../lib/error_handler");
const passport = require("passport");
const requireToken = passport.authenticate("bearer", { session: true });
const customErrors = require("../../lib/custom_errors");
// const handle404 = customErrors.handle404;
// const requireOwnership = customErrors.requireOwnership;
const Todos = require("../models/todos.js");
const router = express.Router();

router.get("/todos", requireToken, (req, res) => {
  Todos.find()
    .then(todos => res.status(200).json({ todos: todos }))
    .catch(error => console.log(error));
});
router.get("/todos/:id", requireToken, (req, res) => {
  Todos.findById(req.params.id)
    .then(todo => res.status(200).json({ todo: todo }))
    .catch(error => console.log(error));
});
router.post("/todos", requireToken, (req, res) => {
  const newTodo = {
    todo: req.body.todo.todo,
    noteID: req.body.todo.noteID
  };
  Todos.create(newTodo)
    .then(createdTodo => res.status(201).json({ todo: createdTodo }))
    .catch(error => console.log(error));
});
router.patch("/todos/:id", requireToken, (req, res) => {
  Todos.findByIdAndUpdate(
    req.params.id,
    req.body.todo,
    { new: true },
    (err, good) => {
      if (err) {
        res.status(500).send("Error trying to patch");
        return;
      }
      res.status(200).json(good);
    }
  );
});
router.delete("/todos/:id", requireToken, (req, res) => {
  Todos.findByIdAndRemove(req.params.id, (err, todo) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send("Todo successfully deleted!!");
  });
});

module.exports = router;
