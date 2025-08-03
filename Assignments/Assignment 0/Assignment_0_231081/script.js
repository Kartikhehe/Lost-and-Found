let msg = document.querySelector("#msg");
let dayDate = document.querySelector("#day-date");

let d = new Date();

let hour = d.getHours();
if (hour > 5 && hour < 12) msg.innerText = "Good Morning!";
else if (hour >= 12 && hour < 17) msg.innerText = "Good Afternoon!";
else msg.innerText = "Good Evening!";

let day = d.getDay();
let dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let date = d.getDate();
let month = d.getMonth();
let year = d.getFullYear();
let monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

dayDate.innerText =
  dayNames[day] + ", " + date + " " + monthNames[month] + " " + year;
