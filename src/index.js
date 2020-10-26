/* eslint-disable consistent-return */
/* eslint-disable no-console */
const express = require('express');
require('./db/mongoose');
const User = require('./models/user.js');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/users', async (req, res) => {
  const user = new User(req.body);

  await user.save();
  try {
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send();
  }
});

app.get('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send('User was not found');
    }
    return res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

app.post('/tasks', async (req, res) => {
  const task = new Task(req.body);
  try {
    task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (e) {
    res.status(500).send();
  }
});

app.get('/tasks/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);
    console.log(task);
    if (!task) {
      return res.status(404).send('Task was not found');
    }
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
