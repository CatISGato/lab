var username = localStorage.getItem("username");
document.getElementById("username").innerText = username;

document.addEventListener('DOMContentLoaded', function() {
    const incomeForm = document.getElementById('incomeForm');
    incomeForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Ambil nilai input dari form
        const description = document.getElementById('description').value;
        const amount = parseFloat(document.getElementById('amount').value);
        const category = document.getElementById('category').value;

        // Validasi input
        if (description === '' || isNaN(amount)) {
            alert('Please fill in all fields correctly.');
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
        incomeForm.reset();
    });

    // Fungsi untuk menyimpan transaksi ke local storage
    function saveTransaction(transaction) {
        let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        transactions.push(transaction);
        localStorage.setItem('transactions', JSON.stringify(transactions));
        // Menampilkan transaksi terakhir di halaman utama (index.html)
        displayTransactions();
    }
});
