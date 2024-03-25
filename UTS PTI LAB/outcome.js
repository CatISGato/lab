var username = localStorage.getItem("username");
document.getElementById("username").innerText = username;

document.addEventListener('DOMContentLoaded', function() {
    const outcomeForm = document.getElementById('outcomeForm');
    outcomeForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Ambil nilai input dari form
        const description = document.getElementById('description').value;
        const amount = parseFloat(document.getElementById('amount').value) * -1; 
        const category = document.getElementById('category').value;

        // Validasi input
        if (description === '' || isNaN(amount)) {
            alert('Please fill in all fields correctly.');
            return;
        }

        // Validasi saldo tidak mencukupi
        const balance = getCurrentBalance();
        if (balance + amount < 0) {
            alert('Insufficient balance. You cannot withdraw more than your current balance.');
            return;
        }

        // Buat objek transaksi baru
        const transaction = {
            description: description,
            amount: amount,
            category: category
        };

        // Tampilkan notifikasi transaksi berhasil
        const confirmation = confirm('Transaction successful. Press OK to return to the main page.');

        // Redirect ke halaman utama setelah tombol OK ditekan
        if (confirmation) {
            location.assign('index.html');
        }

        // Simpan transaksi ke local storage
        saveTransaction(transaction);

        // Reset form setelah pengisian
        outcomeForm.reset();
    });

    // Fungsi untuk menyimpan transaksi ke local storage
    function saveTransaction(transaction) {
        let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        transactions.push(transaction);
        localStorage.setItem('transactions', JSON.stringify(transactions));
        // Menampilkan transaksi terakhir di halaman utama (index.html)
        displayTransactions();
    }

    // Fungsi untuk mendapatkan saldo saat ini
    function getCurrentBalance() {
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

        return totalIncome - totalOutcome;
    }

    // Fungsi untuk mendapatkan transaksi dari local storage
    function getTransactions() {
        return JSON.parse(localStorage.getItem('transactions')) || [];
    }
});
