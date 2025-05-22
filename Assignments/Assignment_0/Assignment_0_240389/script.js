//to show the date
const date = new Date().toDateString();
const divide = date.split(" ");
const newDate = `${divide[0]}, ${divide[1]} ${divide[2]} ${divide[3]}`;
document.getElementById("date").textContent = newDate;

//to show the greeting and the background
const hour = new Date().getHours();
const greeting = document.getElementById("greeting");
const header = document.getElementById("header");
const body = document.body;
const main = document.querySelector("main");
if(hour<12){
    greeting.textContent = "Good Morning!";
    body.classList.add("morning");
    header.innerHTML +=
        `<div class="sun sun1"><i class="fa-solid fa-sun"></i></div>
        <div class="cloud1 cloud-type1"><i class="fa-solid fa-cloud"></i></div>
        <div class="cloud2 cloud-type1"><i class="fa-solid fa-cloud"></i></div>`;
    main.classList.add("morning-main");
}
else if(hour<18){
    greeting.textContent = "Good Afternoon!"
    body.classList.add("afternoon");
    header.innerHTML +=
    `<div class="sun sun2"><i class="fa-solid fa-sun"></i></div>
    <div class="cloud1 cloud-type2"><i class="fa-solid fa-cloud"></i></div>
    <div class="cloud2 cloud-type2"><i class="fa-solid fa-cloud"></i></div>`;
    main.classList.add("afternoon-main");
}
else{
    header.style.color = "#d3d3d3";
    greeting.textContent = "Good Evening!"
    body.classList.add("evening");
    header.innerHTML +=
        `<div class="moon"><i class="fa-solid fa-moon"></i></div>
        <div class="star star1"><i class="fa-solid fa-star"></i></div>
        <div class="star star2"><i class="fa-solid fa-star"></i></div>
        <div class="star star3"><i class="fa-solid fa-star"></i></div>
        <div class="star star4"><i class="fa-solid fa-star"></i></div>
        <div class="star star5"><i class="fa-solid fa-star"></i></div>`;
    main.classList.add("evening-main");
}

//to hide nav bar according to the scroll
let beforeScroll = 0;
const nav = document.querySelector(".nav-bar");
window.addEventListener("scroll", function(){
    let scroll = window.scrollY || document.documentElement.scrollTop;
    if(scroll > beforeScroll){
        nav.classList.add("nav-hide");
    }
    else{
        nav.classList.remove("nav-hide");
    }
    beforeScroll = scroll <= 0 ? 0 : scroll;
});