/* myPage.html에 적용되는 myPage.js 파일입니다. */
const body = document.querySelector("body");

const openEditBtn = document.getElementById("btn-edit-bookShelf");
const modal = document.querySelector(".modal");
const overlay = modal.querySelector(".modal_overlay");
const closeBtn = modal.querySelector(".btn-close");
const completeBtn = modal.querySelector(".bookShelf-edit-complete");

const bookShelfTitle = modal.querySelector(".bookShelf-title");
const bookShelfTitleInput = modal.querySelector(".bookShelf-title-input");
const nameChangeCompleteBtn = modal.querySelector(".bookShelf-name-change-complete");

const nameEditBtn = modal.querySelector(".bookShelf-edit-icon");
const deleteBtn = modal.querySelector(".bookShelf-delete-icon");

const openModal = () => {
    modal.classList.remove("hidden");
    body.classList.add("not-scroll");
};

const closeModal = () => {
    modal.classList.add("hidden");
    body.classList.remove("not-scroll");
};

const changeBookShelfName = () => {
    bookShelfTitle.classList.add("hidden")
    bookShelfTitleInput.classList.remove("hidden")
    nameChangeCompleteBtn.classList.remove("hidden")
}

const onBookShelfNameChangeComplete = () => {
    bookShelfTitle.classList.remove("hidden")
    bookShelfTitleInput.classList.add("hidden")
    nameChangeCompleteBtn.classList.add("hidden")
}

overlay.addEventListener("click",closeModal);
closeBtn.addEventListener("click",closeModal);
openEditBtn.addEventListener("click",openModal);

nameEditBtn.addEventListener("click", changeBookShelfName);
nameChangeCompleteBtn.addEventListener("click", onBookShelfNameChangeComplete);
