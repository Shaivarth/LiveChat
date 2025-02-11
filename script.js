const socket = io(https://livechat-testing.onrender.com);
let username = "";

// Function to generate a unique color based on the username
function getUsernameColor(username) {
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
        hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = `hsl(${hash % 360}, 70%, 50%)`; // Generates vibrant colors
    return color;
}

// Function to handle login
document.getElementById("enter-chat-btn").addEventListener("click", () => {
    const enteredUsername = document.getElementById("username-input").value.trim();
    const enteredPassword = document.getElementById("password-input").value;

    if (enteredUsername && enteredPassword === "Raga") {
        username = enteredUsername;
        document.getElementById("username-overlay").style.display = "none";
        document.querySelector(".chat-container").style.display = "block";
    } else {
        document.getElementById("error-msg").style.display = "block";
    }
});

// Send Message Function
document.getElementById("message-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("message-input");
    const message = input.value.trim();
    if (message) {
        socket.emit("message", { username, message });
        input.value = "";
    }
});

// Display Incoming Messages
socket.on("message", (data) => {
    const chatBox = document.getElementById("chat-box");
    const messageElement = document.createElement("p");

    // Check if the message is from the current user
    const messageClass = data.username === username ? "my-message" : "other-message";

    messageElement.classList.add(messageClass);
    messageElement.innerHTML = `<span class="username" style="color: ${getUsernameColor(data.username)};">${data.username}:</span> ${data.message}`;

    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
});
