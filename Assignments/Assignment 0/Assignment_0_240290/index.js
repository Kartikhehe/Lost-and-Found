let now = new Date();
let hour = now.getHours();

let greetingText;
if (hour<12){
    greetingText = "Good Morning!!";
}else if (hour<18){
    greetingText = "Good Afternoon!!";
}else{
    greetingText = "Good Evening!!";
}

document.getElementById("message").textContent = greetingText;

let dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
let day = dayNames[now.getDay()];
document.getElementById("day").textContent = day + " " + ",";

let date = now.getDate();
let month = now.getMonth()+1;
let year = now.getFullYear();
document.getElementById("date").textContent = date + " " + "/" + " " + month + " " + "/" + " " + year;

function updateClock(){
    let now = new Date();
    let minutes = String(now.getMinutes()).padStart(2, '0');
    let hour = String(now.getHours()).padStart(2, '0');
    if(hour < 12){
        document.getElementById("clock").textContent = hour + " " + ":" + " " + minutes + " " + "a.m";
    }else if(hour == 12){
        document.getElementById("clock").textContent = hour + " " + ":" + " " + minutes + " " + "p.m";
    }else{
        document.getElementById("clock").textContent = (hour-12) + " " + ":" + " " + minutes + " " + "p.m";
    }
}

updateClock();
setInterval(updateClock,1000);

