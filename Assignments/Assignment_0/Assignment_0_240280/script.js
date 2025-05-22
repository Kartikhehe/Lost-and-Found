const starsContainer = document.getElementById("stars");
const cloudsContainer = document.getElementById("clouds");

function createStars(count = 100) {
    for (let i = 0; i < count; i++) {
        const star = document.createElement("div");
        star.className = "star";
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        starsContainer.appendChild(star);
    }
}

function createClouds(count = 7, container = cloudsContainer) {
    for (let i = 0; i < count; i++) {
        const cloud = document.createElement("div");
        cloud.className = "cloud";

        const opacity = Math.random() * 0.5 + 0.5;
        const blur = Math.random() * 5 + 2;
        const animationDelay = Math.random() * 30;
        const animationDuration = Math.random() * 40 + 30;
        const width = Math.random() * 100 + 150;
        const height = width / 2;

        cloud.style.top = `${Math.random() * 60 + 10}%`;
        cloud.style.left = `-${Math.random() * 200}px`;
        cloud.style.opacity = opacity;
        cloud.style.filter = `blur(${blur}px)`;
        cloud.style.animationDelay = `${animationDelay}s`;
        cloud.style.animationDuration = `${animationDuration}s`;
        cloud.style.width = `${width}px`;
        cloud.style.height = `${height}px`;
        cloud.style.zIndex = Math.round(opacity * 10);
        cloud.style.left = `${Math.random() * 100}%`;

        container.appendChild(cloud);
    }
}



createStars();
createClouds();

function updateCelestialBodies() {
    const sun = document.getElementById("sun");
    const moon = document.getElementById("moon");
    const message = document.getElementById("message");
    const path = document.getElementById("sunPath");
    const date_day = document.getElementById('date_day');

    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const totalMinutes = hours * 60 + minutes;
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const formattedDate = `${day}-${month}-${year}`;
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = daysOfWeek[now.getDay()];

    const dayStart = 6 * 60;
    const dayEnd = 18 * 60;
    const isNight = hours < 6 || hours >= 18;

    const svg = document.querySelector(".arc-path");
    const svgRect = svg.getBoundingClientRect();
    const pathLength = path.getTotalLength();

    let progress = 0;

    if (isNight) {
        let nightMinutes = hours < 6
        ? hours * 60 + minutes + 360
        : (hours - 18) * 60 + minutes;

        progress = nightMinutes / (12 * 60);

        moon.style.opacity = 1;
        sun.style.opacity = 0;
        starsContainer.style.display = "block";
        cloudsContainer.style.display = "none";

        document.body.style.background = "linear-gradient(to top, #001d3d, #003566)";
        message.style.color = "#fff";
        date_day.style.color = "#fff";
    } else {
        progress = (totalMinutes - dayStart) / (dayEnd - dayStart);

        sun.style.opacity = 1;
        moon.style.opacity = 0;
        starsContainer.style.display = "none";
        cloudsContainer.style.display = "block";

        document.body.style.background = "linear-gradient(to top, #87ceeb,rgb(229, 239, 250))";
        message.style.color = "#333";
        date_day.style.color = "#333";
    }

    const point = path.getPointAtLength(pathLength * progress);
    const x = (point.x / 100) * svgRect.width;
    const y = (point.y / 50) * svgRect.height;

    if (!isNight) {
        sun.style.left = `${x}px`;
        sun.style.top = `${y}px`;
    } else {
        moon.style.left = `${x}px`;
        moon.style.top = `${y}px`;
    }

    let greeting = "";
    if (hours >= 6 && hours < 12) greeting = "Good Morning!";
    else if (hours >= 12 && hours < 17) greeting = "Good Afternoon!";
    else if (hours >= 17 && hours < 21) greeting = "Good Evening!";
    else greeting = "Good Night!";

    message.textContent = `${greeting}`;
    date_day.textContent = `${formattedDate} ${dayName}`;
    message.style.textShadow = "8px 8px 16px rgba(0, 0, 0, 0.5)";
    date_day.style.textShadow = "8px 8px 16px rgba(0, 0, 0, 0.5)";

    const aboutMe = document.querySelector('.about_me');
    const skills = document.querySelector('.skills');
    const hobbies = document.querySelector('.hobbies');
    const projects = document.querySelector('.projects');
    const contact = document.querySelector('.contact');

    if (aboutMe && skills && hobbies) { 
        if (isNight) {
            aboutMe.style.color = "#fff";
            skills.style.color = "#fff";
            hobbies.style.color = "#fff";
            projects.style.color = "#fff";
            contact.style.color = "#fff";
        } else {
            aboutMe.style.color = "#333";
            skills.style.color = "#333";
            hobbies.style.color = "#333";
            projects.style.color = "#333";
            contact.style.color = "#333";
    }
}
}

updateCelestialBodies();
setInterval(updateCelestialBodies, 60000);


document.querySelectorAll('.clickable-section').forEach((section) => {
    section.addEventListener('click', (e) => {
        e.stopPropagation();

        const overlay = document.querySelector('.overlay');
        const enlargedSection = document.querySelector('.enlarged-section');
        const enlargedContent = document.querySelector('.enlarged-content');

        enlargedContent.innerHTML = section.innerHTML;

        const now = new Date();
        const hours = now.getHours();
        const isNight = hours < 6 || hours >= 18;

        if (isNight) {
            enlargedSection.style.background = "linear-gradient(to top, #001d3d, #003566)";
            enlargedContent.style.color = "#fff";
        } else {
            enlargedSection.style.background = "linear-gradient(to top, #87ceeb, #ffffff)";
            enlargedContent.style.color = "#333";
        }

        overlay.classList.add('open');
        enlargedSection.classList.add('open');

        document.querySelector('.background').classList.add('blur');
        document.body.classList.add('overlay-open');
    });
});

document.querySelector('.overlay').addEventListener('click', (e) => {

    if (e.target === document.querySelector('.overlay')) {
        closeOverlay();
    }
});

function closeOverlay() {
    const overlay = document.querySelector('.overlay');
    const enlargedSection = document.querySelector('.enlarged-section');

    overlay.classList.remove('open');
    enlargedSection.classList.remove('open');

    document.querySelector('.background').classList.remove('blur');
    document.body.classList.remove('overlay-open');
}
