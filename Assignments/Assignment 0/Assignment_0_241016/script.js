function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  else if (hour < 18) return "Good Afternoon";
  else return "Good Evening";
}

document.getElementById("greeting").innerText = getGreeting();

const dateEl = document.getElementById("date");
const now = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
dateEl.innerText = now.toLocaleDateString(undefined, options);