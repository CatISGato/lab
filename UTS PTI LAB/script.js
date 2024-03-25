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


document.addEventListener('DOMContentLoaded', function() {
    // Memanggil fungsi untuk menampilkan balance
    displayBalance();

    // Fungsi untuk menampilkan transaksi
    function displayTransactions() {
        const transactions = getTransactions();
        const transactionBody = document.getElementById('transactionBody');
        transactionBody.innerHTML = '';

        transactions.forEach(function(transaction) {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${transaction.description}</td>
                <td>${transaction.amount}</td>
                <td>${transaction.category}</td>
            `;
            transactionBody.appendChild(newRow);
        });
    }

    // Fungsi untuk mengambil transaksi dari local storage
    function getTransactions() {
        return JSON.parse(localStorage.getItem('transactions')) || [];
    }

    // Fungsi untuk menampilkan balance
    function displayBalance() {
        const transactions = getTransactions();
        let totalIncome = 0;
        let totalOutcome = 0;

        transactions.forEach(function(transaction) {
            if (transaction.amount > 0) {
                totalIncome += transaction.amount;
            } else {
                totalOutcome -= transaction.amount; // Karena amount pengeluaran adalah negatif, maka dikurangi
            }
        });

        const balance = totalIncome - totalOutcome;
        document.getElementById('currentBalance').innerText = balance.toFixed(2); // Menampilkan balance dengan 2 desimal
    }
});

// script.js

document.addEventListener('DOMContentLoaded', function() {
    // Menambahkan event listener untuk tombol Clear Data
    document.getElementById('clearDataButton').addEventListener('click', function() {
        // Konfirmasi sebelum menghapus data
        const confirmation = confirm('Are you sure you want to clear all data? This action cannot be undone.');

        // Jika pengguna menekan tombol OK pada konfirmasi
        if (confirmation) {
            // Menghapus data dengan key 'transactions' dari local storage
            localStorage.removeItem('transactions');
            
            // Refresh halaman
            location.reload();
        }
    });
});


