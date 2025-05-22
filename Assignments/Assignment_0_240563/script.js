// Function to update greeting based on time of day
function updateGreeting() {
    const now = new Date();
    const hour = now.getHours();
    const greetingElement = document.getElementById('greeting');
    
    if (hour < 12) {
        greetingElement.textContent = 'Good Morning';
    } else if (hour < 17) {
        greetingElement.textContent = 'Good Afternoon';
    } else {
        greetingElement.textContent = 'Good Evening';
    }
}

// Function to update current date and day
function updateDate() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    
    const dateString = now.toLocaleDateString('en-US', options);
    document.getElementById('current-date').textContent = dateString;
}

// Function to add smooth scrolling to sections
function addSmoothScrolling() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.addEventListener('click', function() {
            this.scrollIntoView({ behavior: 'smooth' });
        });
    });
}


// Function to update time every minute
function startTimeUpdater() {
    updateGreeting();
    updateDate();
    
    // Update every minute
    setInterval(() => {
        updateGreeting();
        updateDate();
    }, 60000);
}

// Initialize all functions when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    startTimeUpdater();
    addSmoothScrolling();
    
    
    // Add fade-in effect for the entire page
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

