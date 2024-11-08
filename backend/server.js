const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const Loan = require('./models/Loan');

const app = express();
app.use(express.json());  // Middleware to parse JSON data

mongoose.connect('mongodb://localhost:27017/microloan', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// User registration endpoint
app.post('/api/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// User login endpoint
app.post('/api/login', async (req, res) => {
  // Logic for verifying user and issuing a token goes here
  // For example:
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && bcrypt.compare(password, user.password)) {
    res.status(200).send({ token: "YourJWTToken" });
  } else {
    res.status(400).send('Invalid credentials');
  }
});

// Loan application endpoint
app.post('/api/loan/apply', async (req, res) => {
  try {
    const loan = new Loan(req.body);
    await loan.save();
    res.status(201).send(loan);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Endpoint to get user loans
app.get('/api/loans/:userId', async (req, res) => {
  try {
    const loans = await Loan.find({ user: req.params.userId });
    res.send(loans);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Starting the server
app.listen(5000, () => console.log('Server is running on http://localhost:5000'));