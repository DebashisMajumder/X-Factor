document.getElementById('loan-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Gather form data
    const name = document.getElementById('name').value;
    const amount = document.getElementById('amount').value;
    const income = document.getElementById('income').value;
    const creditScore = document.getElementById('credit-score').value;

    // Simple form validation
    if (!name || !amount || !income || !creditScore) {
        alert('Please fill in all the fields!');
        return;
    }

    // Prepare the data to be sent to the backend
    const loanData = {
        name: name,
        amount: amount,
        income: income,
        creditScore: creditScore
    };

    // Send data to the backend
    fetch('/api/loan', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loanData)
    })
    .then(response => response.json())
    .then(data => {
        alert('Loan application submitted successfully!');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error submitting your loan application.');
    });
});