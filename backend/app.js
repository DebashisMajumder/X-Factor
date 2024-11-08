const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize app and middlewares
const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost/microloan', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Loan schema and model
const loanSchema = new mongoose.Schema({
    name: String,
    amount: Number,
    income: Number,
    creditScore: Number,
    status: {
        type: String,
        default: 'Pending'
    }
});

const Loan = mongoose.model('Loan', loanSchema);

// API Route for submitting a loan application
app.post('/api/loan', (req, res) => {
    const { name, amount, income, creditScore } = req.body;

    if (!name || !amount || !income || !creditScore) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const newLoan = new Loan({
        name,
        amount,
        income,
        creditScore
    });

    newLoan.save()
        .then((loan) => {
            res.status(201).json({
                message: 'Loan application submitted successfully',
                loanId: loan._id
            });
        })
        .catch((err) => {
            res.status(500).json({ message: 'Error saving loan application', error: err });
        });
});

// API to get loan applications (for admins)
app.get('/api/loans', (req, res) => {
    Loan.find()
        .then(loans => res.json(loans))
        .catch(err => res.status(500).json({ message: 'Error retrieving loans', error: err }));
});

// Start the server
const port = 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
