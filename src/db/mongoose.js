const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
});

const User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid')
      }
      console.log('Email added correct!')
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be greater than 0!')
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password should not contain word "password"!')
      }
    }
  }
});

// const user = new User({
//   name: 'Mattew',
//   age: 22,
//   email: 'matt@gmail.com',
//   password: '1234567'
// });

// user.save().then(() => {
//   console.log(user);
// }).catch((err) => {
//   console.log('Error', err);
// })

const Task = mongoose.model('Task', {
  description: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false,
    required: false
  }
})

const myTask = new Task({
  description: 'My first mongoose task'
})

myTask.save().then(()=> {
  console.log(myTask);
}).catch((err) => {
  console.log('Error', err)
})

