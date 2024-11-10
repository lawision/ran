document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signupForm");

    signupForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission

        // Get form data
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const address = document.getElementById("address").value; // Single address field
        const contactNumber = document.getElementById("contactNumber").value;
        const emailAddress = document.getElementById("emailAddress").value;
        const newPassword = document.getElementById("newPassword").value;
        const validID = document.getElementById("validID").files[0]; // Get the uploaded ID image

        if (validID) {
            // Convert the file to Base64
            const reader = new FileReader();
            reader.onload = function() {
                const validIDBase64 = reader.result; // Get Base64 string

                // Create user object
                const newUser = {
                    firstName,
                    lastName,
                    contactNumber,
                    address, // Store the full address
                    emailAddress,
                    password: newPassword,
                    idPath: validIDBase64, // Save the Base64 string
                };

                // Get existing users from localStorage, or initialize an empty array
                const users = JSON.parse(localStorage.getItem("users")) || [];

                // Add the new user to the users array
                users.push(newUser);

                // Save the updated users array to localStorage
                localStorage.setItem("users", JSON.stringify(users));

                // Redirect to a success page or login page
                alert("Account created successfully!");
                window.location.href = "login.html"; // Redirect to login
            };
            reader.readAsDataURL(validID); // Read file as Base64
        } else {
            alert("Please upload a valid ID.");
        }
    });
});
