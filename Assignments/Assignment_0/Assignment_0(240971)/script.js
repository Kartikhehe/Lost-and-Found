// Update greeting based on time
function updateGreeting() {
    const hour = new Date().getHours();
    const greeting = document.getElementById('greeting');
    
    if (hour < 12) {
        greeting.textContent = 'Good Morning';
    } else if (hour < 18) {
        greeting.textContent = 'Good Afternoon';
    } else {
        greeting.textContent = 'Good Evening';
    }
}

// Update date display
function updateDate() {
    const dateElement = document.getElementById('date');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date().toLocaleDateString('en-US', options);
    dateElement.textContent = today;
}

// Initialize functions when page loads
window.onload = function() {
    updateGreeting();
    updateDate();
};