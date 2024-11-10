document.addEventListener("DOMContentLoaded", () => {
    const userTableBody = document.querySelector("#userTable tbody");

    // Load users from local storage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Function to render user rows in the table
    function renderUsers() {
        userTableBody.innerHTML = ""; // Clear existing rows

        users.forEach((user, index) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.contactNumber}</td>
                <td>${user.address}</td>
                <td>${user.emailAddress}</td>
                <td>${user.password}</td>
                <td>
                    <img src="${user.idPath}" alt="Valid ID" style="width: 100px; height: auto;">
                </td>
                <td>
                    <button class="delete-btn" data-index="${index}">Delete</button>
                </td>
            `;
            userTableBody.appendChild(row);
        });
    }

    // Function to delete a user
    function deleteUser(index) {
        users.splice(index, 1); // Remove user from array
        localStorage.setItem("users", JSON.stringify(users));
        renderUsers(); // Re-render user list
    }

    // Event delegation for action buttons
    userTableBody.addEventListener("click", (event) => {
        const index = event.target.getAttribute("data-index");

        // Delete button click
        if (event.target.classList.contains("delete-btn")) {
            deleteUser(index);
        }
    });

    renderUsers(); // Initial render
});
