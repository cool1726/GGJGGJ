// const navbarWelcome = document.querySelector(".navbar-welcome");
const navbarMyMenu = document.querySelector(".navbar-mymenu");
const profileBtn = document.getElementById("profile");

const toggleMyMenu = () => {
    console.log("profile clicked");
    navbarMyMenu.classList.toggle("hidden");
};

const openCloseModal = () => {
    console.log("check");
    navbarMyMenu.classList.toggle("hidden");

  };

const openModal = () => {
    modal.classList.remove("hidden");
    body.classList.add("not-scroll");
  };
// navbarWelcome.addEventListener("click", toggleMyMenu);
profileBtn.addEventListener("click", openCloseModal);