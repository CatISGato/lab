document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); 
    var username = document.getElementById("Nama").value;
    localStorage.setItem("username", username); 
    window.location.href = "index.html";
});
