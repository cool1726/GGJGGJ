// const navbarWelcome = document.querySelector(".navbar-welcome");
const navbarMyMenu = document.querySelector(".navbar-mymenu");
const profileBtn = document.getElementById("profile");

const toggleMyMenu = () => {
  console.log("check");
  navbarMyMenu.classList.toggle("hidden");
};

profileBtn.addEventListener("click", toggleMyMenu);