/* myPage.html에 적용되는 myPage.js 파일입니다. */
const body = document.querySelector("body");

const openEditBtn = document.getElementById("btn-edit-bookShelf");
const modal = document.querySelector(".modal");
const overlay = modal.querySelector(".modal_overlay");
const closeBtn = modal.querySelector(".btn-close");
const completeBtn = modal.querySelector(".bookShelf-edit-complete");

const bookShelfToolContainerList = modal.querySelectorAll(".bookShelf-tool-container");

const posts = document.querySelectorAll(".posts");

const openModal = () => {
    modal.classList.remove("hidden");
    body.classList.add("not-scroll");
};

const closeModal = () => {
    modal.classList.add("hidden");
    body.classList.remove("not-scroll");
};

overlay.addEventListener("click",closeModal);
closeBtn.addEventListener("click",closeModal);
openEditBtn.addEventListener("click",openModal);

bookShelfToolContainerList.forEach(container => {

    const nameEditBtn = container.querySelector(".bookShelf-edit-icon");
    const deleteBtn = container.querySelector(".bookShelf-delete-icon");

    const bookShelfTitle = container.querySelector(".bookShelf-edit-title");
    const bookShelfTitleInput = container.querySelector(".bookShelf-title-input");
    const nameChangeCompleteBtn = container.querySelector(".bookShelf-name-change-complete");

    nameEditBtn.addEventListener("click", () => {
        bookShelfTitle.classList.add("hidden");
        bookShelfTitleInput.classList.remove("hidden");
        nameChangeCompleteBtn.classList.remove("hidden");
    });

    nameChangeCompleteBtn.addEventListener("click", () => {
        bookShelfTitle.classList.remove("hidden");
        bookShelfTitleInput.classList.add("hidden");
        nameChangeCompleteBtn.classList.add("hidden");
    });

});
