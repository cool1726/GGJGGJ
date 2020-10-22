const navbarWelcome = document.querySelector(".navbar-welcome");
const navbarMyMenu = document.querySelector(".navbar-mymenu");

const toggleMyMenu = () => {
    console.log("profile clicked");
    navbarMyMenu.classList.toggle("hidden");
};
navbarWelcome.addEventListener("click", toggleMyMenu);