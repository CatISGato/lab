// script.js
var username = localStorage.getItem("username");
document.getElementById("username").innerText = username;

document.addEventListener('DOMContentLoaded', function () {
    let currentPage = 1;
    const transactionsPerPage = 10;

    // Function to display transactions based on currentPage
    function displayTransactions() {
        const transactions = getTransactions();
        const transactionBody = document.getElementById('transactionBody');
        transactionBody.innerHTML = '';

        // Sort transactions in reverse order (newest to oldest)
        const sortedTransactions = transactions.slice().reverse();

        const startIndex = (currentPage - 1) * transactionsPerPage;
        const endIndex = startIndex + transactionsPerPage;
        const currentTransactions = sortedTransactions.slice(startIndex, endIndex);

        currentTransactions.forEach(function (transaction) {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${transaction.description}</td>
                <td>${transaction.amount}</td>
                <td>${transaction.category}</td>
            `;
            transactionBody.appendChild(newRow);
        });

        // Display or hide Previous button based on currentPage
        const previousButton = document.getElementById('previousButton');
        previousButton.disabled = currentPage === 1;

        // Display or hide Next button based on transactions length
        const nextButton = document.getElementById('nextButton');
        nextButton.disabled = endIndex >= sortedTransactions.length;
    }

    // Function to get transactions from local storage
    function getTransactions() {
        return JSON.parse(localStorage.getItem('transactions')) || [];
    }

    // Function to handle Next button click
    document.getElementById('nextButton').addEventListener('click', function () {
        currentPage++;
        displayTransactions();
    });

    // Function to handle Previous button click
    document.getElementById('previousButton').addEventListener('click', function () {
        currentPage--;
        displayTransactions();
    });

    // Initial display of transactions
    displayTransactions();
});
