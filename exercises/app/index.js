const express = require("express");
const morgan = require("morgan");
const connect = require("../connect");
const { json, urlencoded } = require("body-parser");
const app = express();
const Todo = require("./todo");

app.use(morgan("dev"));
app.use(urlencoded({ extended: true }));
app.use(json());

app.get("/todo/:id", (req, res) => {
  const todoId = req.params.id;
  Todo.findOne({ _id: todoId })
    .then(content => {
      if (content) {
        res.status(200).json(content);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(e => {
      console.error(e.message);
      res.sendStatus(404);
    });
});

app.get("/todos", (req, res) => {
  Todo.find({})
    .then(content => {
      if (content) {
        res.status(200).json(content);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(e => {
      console.error(e.message);
      res.sendStatus(404);
    });
});

app.post("/todo", async (req, res) => {
  const todoToCreate = req.body.todo;

  if (
    Object.entries(todoToCreate).length === 0 &&
    todoToCreate.constructor === Object
  ) {
    console.error("please make sure todo content is not empty");
    res.sendStatus(404);
    return;
  }

  Todo.create({
    ...todoToCreate
  })
    .then(content => {
      res.status(200).send({ message: 'posted' });
    })
    .catch(e => {
      console.error(e.message);
      res.sendStatus(404);
    });
});

connect("mongodb://localhost:27017/test")
  .then(() =>
    app.listen(4000, () => {
      console.log("server on http://localhost:4000");
    })
  )
  .catch(e => console.error(e));
