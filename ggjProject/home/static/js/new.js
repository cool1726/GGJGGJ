/* new.html에 적용되는 기본 new.js 파일입니다. new.html 관련 다른 js파일은 'new_' 로 시작하는 파일로 가주세요. */

const body = document.querySelector("body");

const openBtn = document.getElementById("btn-upload");
const modal = document.querySelector(".modal");
const overlay = modal.querySelector(".modal__overlay");
const closeBtn = modal.querySelector(".btn-close");
const fileBtn = modal.querySelector("#img-upload");

const navUpload = modal.querySelector("#nav__upload");
const navUnsplash = modal.querySelector("#nav__unsplash");
const contUpload = modal.querySelector(".upload-container");
const contUnsplash = modal.querySelector(".unsplash-container");

const uploadBtn = modal.querySelector("#img-upload");
const imgPre = modal.querySelector("#img__preview");

const divImage = document.querySelector(".etc_image");

const openModal = () => {
  modal.classList.remove("hidden");
  body.classList.add("not-scroll");
};
const closeModal = () => {
  modal.classList.add("hidden");
  body.classList.remove("not-scroll");
};
const openUpload = () => {
  contUnsplash.classList.add("hidden");
  contUpload.classList.remove("hidden");
};
const openUnsplash = () => {
  contUpload.classList.add("hidden");
  contUnsplash.classList.remove("hidden");
};
const showPreview = (e) => {
  let get_file = e.target.files;
  let image = document.createElement("img");
  if (imgPre.hasChildNodes()) {
    imgPre.removeChild(imgPre.firstChild);
  }

  /* FileReader 객체 생성 */
  var reader = new FileReader();

  /* reader 시작 시 함수 구현 */
  reader.onload = (function (aImg) {
    console.log(1);

    return function (e) {
      console.log(3);
      aImg.src = e.target.result;
    };
  })(image);

  if (get_file) {
    reader.readAsDataURL(get_file[0]);
    console.log(2);
  }

  imgPre.appendChild(image);
};

overlay.addEventListener("click", closeModal);
closeBtn.addEventListener("click", closeModal);
openBtn.addEventListener("click", openModal);
navUpload.addEventListener("click", openUpload);
navUnsplash.addEventListener("click", openUnsplash);
uploadBtn.addEventListener("change", showPreview);


// 엔터키 눌리는거 방지
$(function () {
  $("input:text").keydown(function (evt) {
    if (evt.keyCode == 13) return false;
  });
});


// 글 쓸 때 길이 늘어나면 자동으로 높이 조정
const inputBody = document.querySelector("textarea");

inputBody.addEventListener('input', autoResize);

function autoResize() {
  this.style.height = 'auto';
  this.style.height = this.scrollHeight + 'px';
}


// 책장 선택 관련 함수
const selectedShelf = document.querySelector(".selectedShelf");
const optionsContainer = document.querySelector(".options-container");
const optionsList = document.querySelectorAll(".option");

const activeOption = () => {
  optionsContainer.classList.toggle("active");
}

selectedShelf.addEventListener("click", activeOption);

optionsList.forEach(obj => {
  obj.addEventListener("click", () => {
    selectedShelf.innerHTML = obj.querySelector("label").innerHTML;
    optionsContainer.classList.remove("active");
  });
});


// 도서 검색 관련 함수
const selectedBook = document.querySelector("#bookSearch");
const booksContainer = document.querySelector(".results-container");
const booksList = document.querySelectorAll(".book_item");

const activeBooks = () => {
  booksContainer.classList.add("active");
}
const deactiveBooks = () => {
  booksContainer.classList.remove("active");
}

selectedBook.addEventListener("keydown", activeBooks);
selectedBook.addEventListener("focus", activeBooks);
selectedBook.addEventListener("blur", deactiveBooks);

booksList.forEach(obj => {
  obj.addEventListener("click", () => {
    div.innerHTML = obj.querySelector(".title").innerHTML;
    booksContainer.classList.remove("active");
  });
});

//도서 선택시
function showSelectBook(event){
  var value = JSON.parse(event.id)
  console.log(value)
  $('.selectedBook .book_item').remove()
  $('.selectedBook').append('<div class="book_item" id="'+ "value" + '">' +
                                '<img src="' + value.thumbnail + '" class="thumbnail" />' + '<div class="book_infos">' +
                                '<p class="book_info title noto-medium">' + value.title + '</p>' +
                                '<p class="book_info authors noto-light">' + value.authors + ' 지음</p>' +
                                // '<p class="contents">' + value[j].contents + '</p>' +
                                '<p class="book_info publisher noto-light">' + value.publisher + '</p>' +
                                '<p class="book_info datetime noto-light">' + strToDate(value.datetime) + '</p>' +
                                '</div>' + '</div>')
                                
}

//사진 선택시
function showSelectImage(event){
  var value = JSON.parse(event.id)
  console.log(value)
  $('.etc_image .list_item').remove()
  $('.etc_image').append(
    '<div class="list_item" id="'+ "value" + '">' +
    '<img class="list_img" src="' + value.urls.small + '"/>' +
    '</div>')
  modal.classList.add("hidden");
}
