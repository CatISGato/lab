document.getElementById("moneyForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var description = document.getElementById("description").value;
    var amount = parseFloat(document.getElementById("amount").value);
    if (description.trim() === "" || isNaN(amount)) {
        alert("Please enter valid description and amount.");
        return;
    }
    addTransaction(description, amount);
    document.getElementById("moneyForm").reset();
});

function addTransaction(description, amount) {
    var tableBody = document.getElementById("transactionBody");
    var newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td>${description}</td>
        <td>${amount.toFixed(2)}</td>
    `;
    tableBody.appendChild(newRow);
}
