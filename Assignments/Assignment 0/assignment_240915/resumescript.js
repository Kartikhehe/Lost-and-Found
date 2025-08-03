
window.onload = function () {
  const greetingElement = document.getElementById('greeting');
  const now = new Date();
  const hour = now.getHours();
  let greetingText = '';

  if (hour < 12) {
    greetingText = '\"Good Morning\" ';
  } else if (hour < 17) {
    greetingText = 'Good Afternoon ';
  } else {
    greetingText = 'Good Evening ';
  }
  greetingElement.textContent = greetingText;

  const dateElement = document.getElementById('date');
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const day = days[now.getDay()];
  const formattedDate = now.toLocaleDateString(); // e.g., 20/05/2025 or 05/20/2025

  dateElement.textContent = ` ${day}, ${formattedDate}`;
};
