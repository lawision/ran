document.addEventListener("DOMContentLoaded", () => {
    const salesTableBody = document.getElementById("salesTableBody");
    const filterSelect = document.getElementById("filterSelect");

    // Get sales data from localStorage
    const salesData = JSON.parse(localStorage.getItem("salesData")) || [];

    // Function to render sales data
    function renderSales(filteredSales) {
        salesTableBody.innerHTML = ""; // Clear any existing rows

        // Loop through each sale and create a table row
        filteredSales.forEach(sale => {
            const row = document.createElement("tr");

            // Calculate the total amount for this sale
            const productNames = sale.products.map(product => product.name).join(", ");
            let totalAmount = 0;
            
            // Correctly calculate the total by summing up price * quantity for each product
            sale.products.forEach(product => {
                totalAmount += product.price * product.quantity;
            });

            const formattedTotalAmount = `₱${totalAmount.toFixed(2)}`;

            // Format the date and time for display
            const saleDate = new Date(sale.date);
            const formattedDate = saleDate.toLocaleDateString(); // Date in local format
            const formattedTime = saleDate.toLocaleTimeString(); // Time in local format

            row.innerHTML = `
                <td>${sale.orderId}</td>
                <td>${formattedDate} ${formattedTime}</td> <!-- Date and Time -->
                <td>${productNames}</td>
                <td>${formattedTotalAmount}</td>
            `;

            salesTableBody.appendChild(row);
        });
    }

    // Function to filter sales data based on the selected timeframe
    function filterSales() {
        const selectedFilter = filterSelect.value;
        const now = new Date();
        let filteredSales = salesData;

        if (selectedFilter === "day") {
            // Filter for sales in the last 24 hours
            filteredSales = salesData.filter(sale => {
                const saleDate = new Date(sale.date);
                return (now - saleDate) <= 24 * 60 * 60 * 1000;
            });
        } else if (selectedFilter === "week") {
            // Filter for sales in the last 7 days
            filteredSales = salesData.filter(sale => {
                const saleDate = new Date(sale.date);
                return (now - saleDate) <= 7 * 24 * 60 * 60 * 1000;
            });
        } else if (selectedFilter === "month") {
            // Filter for sales in the last 30 days
            filteredSales = salesData.filter(sale => {
                const saleDate = new Date(sale.date);
                return (now - saleDate) <= 30 * 24 * 60 * 60 * 1000;
            });
        }

        renderSales(filteredSales);
    }

    // Event listener for the filter dropdown
    filterSelect.addEventListener("change", filterSales);

    // Initial render of all sales data
    renderSales(salesData);
});
