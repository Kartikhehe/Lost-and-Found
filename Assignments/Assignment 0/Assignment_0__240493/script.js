function updateGreeting() {
    const hour = new Date().getHours();
    const greetingElement = document.getElementById('greeting');
    
    if (hour < 12) {
        greetingElement.textContent = 'Good Morning';
    } else if (hour < 18) {
        greetingElement.textContent = 'Good Afternoon';
    } else {
        greetingElement.textContent = 'Good Evening';
    }
}

// Update date and time
function updateDateTime() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const now = new Date();
    const dateTimeElement = document.getElementById('date-time');
    
    dateTimeElement.textContent = now.toLocaleDateString('en-US', options);
}

// Initialize functions when page loads
window.onload = function() {
    updateGreeting();
    updateDateTime();
    
    // Update time every minute (optional)
    setInterval(updateGreeting, 60000);
};