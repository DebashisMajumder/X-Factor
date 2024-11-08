const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected', 'Completed'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  repayments: [
    {
      amount: Number,
      date: { type: Date, default: Date.now }
    }
  ]
});

const Loan = mongoose.model('Loan', loanSchema);

module.exports = Loan;