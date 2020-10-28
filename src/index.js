/* eslint-disable no-console */
const express = require('express');
require('./db/mongoose');

const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter, taskRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// eslint-disable-next-line import/order
const jwt = require('jsonwebtoken');

const testFunction = async () => {
  const token = jwt.sign({ _id: 'someid123' }, 'somedata');
  console.log(token);
  try {
    const data = jwt.verify(token, 'somedata', { expiresIn: '1000 seconds' });
    console.log(data);
  } catch (e) {
    console.log('Token verification error, check data provided');
  }
};

testFunction();
