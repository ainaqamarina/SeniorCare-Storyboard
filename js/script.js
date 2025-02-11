// Initialize date picker
flatpickr(".datepicker", {
    dateFormat: "Y-m-d",
});

// Event listener for Calculate Price button
document.getElementById("calculateButton").addEventListener("click", function () {
    const packageType = document.getElementById("package").value;
    const checkin = new Date(document.getElementById("checkin").value);
    const checkout = new Date(document.getElementById("checkout").value);
    const priceDisplay = document.getElementById("priceDisplay");

    if (!packageType || isNaN(checkin) || isNaN(checkout)) {
        priceDisplay.textContent = "Please fill in all fields.";
        return;
    }

    if (checkout <= checkin) {
        priceDisplay.textContent = "Check-out date must be after the check-in date.";
        return;
    }

    const diffMs = checkout - checkin; // Difference in milliseconds
    const totalDays = diffMs / (1000 * 60 * 60 * 24); // Convert to days
    const months = Math.floor(totalDays / 30); // Full months
    const leftoverDays = totalDays % 30; // Remaining days

    let monthlyRate = 0;
    let dailyRate = 0;

    if (packageType === "single") {
        monthlyRate = 15000;
        dailyRate = 500;
    } else if (packageType === "double") {
        monthlyRate = 45000;
        dailyRate = 1500;
    } else if (packageType === "triple") {
        monthlyRate = 60000;
        dailyRate = 2000;
    }

    const totalPrice = (months * monthlyRate) + (leftoverDays * dailyRate);

    priceDisplay.textContent = `Total Price: RM ${totalPrice}`;

    // Update progress indicator
    document.getElementById("step1").classList.add("completed");
    document.getElementById("step2").classList.add("completed");
});

// Example of moving to the next step (e.g., after confirming booking)
function confirmBooking() {
    document.getElementById("step3").classList.add("completed");
}

