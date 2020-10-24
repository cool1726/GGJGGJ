/* new.html에 적용되는 기본 new.js 파일입니다. new.html 관련 다른 js파일은 'new_' 로 시작하는 파일로 가주세요. */

const body = document.querySelector("body");

const openBtn = document.getElementById("btn-upload");
const modal = document.querySelector(".modal");
const overlay = modal.querySelector(".modal__overlay");
const closeBtn = modal.querySelector(".btn-close");
const fileBtn = modal.querySelector("#img-upload");
const fileBtn2 = modal.querySelector("#img-upload2"); //unsplash 사진

const navUpload = modal.querySelector("#nav__upload");
const navUnsplash = modal.querySelector("#nav__unsplash");
const contUpload = modal.querySelector(".upload-container");
const contUnsplash = modal.querySelector(".unsplash-container");

const uploadBtn = modal.querySelector("#img-upload");
const uploadBtn2 = modal.querySelector("#img-upload2"); //unsplash 사진
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
  if (form.postCover2.value != null) {
    form.postCover2.value = null;
  }
  let get_file = e.target.files;
  let image = document.createElement("img");
  if (imgPre.hasChildNodes()) {
    imgPre.removeChild(imgPre.firstChild);
  }
  imgPre.appendChild(image);

  /* FileReader 객체 생성 */
  var reader = new FileReader();

  /* reader 시작 시 함수 구현 */
  reader.onload = (function (aImg, img) {
    console.log(1);
    // form.postCover2.value=null;
    return function (e) {
      console.log(3);
      // image url 반환하여 image(parameter name: aImg)에 저장
      aImg.style.backgroundImage = `url('${e.target.result}')`;
      aImg.style.backgroundSize = "cover";
      img.src = e.target.result;
    };
  })(divImage, image);

  if (get_file) {
    reader.readAsDataURL(get_file[0]); // 업로드한 파일 객체 읽어오기
    console.log(2);
  }

  Array.from(openBtn.children).forEach(child => {
    child.classList.remove("green");
    child.classList.add("white");
  });
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
    console.log(obj.querySelector("label").id)
    $('#bookShelfID').val(obj.querySelector("label").id);
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


// 도서 선택시
function showSelectBook(event) {
  // console.log(event.id)
  var value = JSON.parse(event.id)
  // var value2 = JSON.parse($(event).attr('value'))
  console.log($(event).attr('value1'))
  $('#bookResult').css("max-height", "0px");
  deactiveBooks;
  $('.selectedBook .book_item').remove()
  $('.selectedBook').append('<div class="book_item" id="' + "value" + '">' +
    '<img src="' + $(event).attr('value1') + '" class="thumbnail" />' + '<div class="book_infos">' +
    '<p class="book_info title noto-medium">' + $(event).attr('value2') + '</p>' +
    '<p class="book_info authors noto-light">' + $(event).attr('value4') + ' 지음</p>' +
    // '<p class="contents">' + value[j].contents + '</p>' +
    '<p class="book_info publisher noto-light">' + $(event).attr('value5') + '</p>' +
    '<p class="book_info datetime noto-light">' + strToDate($(event).attr('value6')) + '</p>' +
    '</div>' + '</div>')
  // console.log(JSON.stringify(value))
  $('#thumbnail').val($(event).attr('value1'));
  $('#booktitle').val($(event).attr('value2'));
  $('#isbn').val($(event).attr('value3'));
  $('#authors').val($(event).attr('value4'));
  $('#publisher').val($(event).attr('value5'));
  $('#datetime').val($(event).attr('value6'));
  $('#contents').val($(event).attr('value7'));
  console.log($('#contents').val)
}

// unsplash 사진 선택시
function showSelectImage(event) {

  //$("#img-upload").replaceWith($("#img-upload").val('').clone(true));

  form.postCover.value = null;

  console.log(event);
  $('.etc_image .list_item').remove();
  closeModal();

  Array.from(openBtn.children).forEach(child => {
    child.classList.remove("green");
    child.classList.add("white");
  });

  divImage.style.backgroundImage = `url('${event}')`;
  divImage.style.backgroundSize = "cover";
  $('#img-upload2').val(event);
  fileBtn2.value = `${event}`;
}

//폼내용 다 채웠는지 체크
function formCheck() {
  if (form.title.value == "") {
    alert("제목을 입력해주세요");
    return false;
  } else if (form.body.value == "") {
    alert("후기를 입력해주세요");
    return false;
  } else if (form.bookShelfID.value == "") {
    alert("책장을 선택해주세요");
  } else if (form.booktitle.value == "") {
    alert("읽으신 책을 선택해주세요");
  } else if (form.postCover.files.length == 0 && form.postCover2.value == null) {
    alert("사진을 올려주세요");
  } else {
    document.form.submit();
  }
}

// 제목 글자수 체크하는 함수
function textCounter() {
  let inputTitle = document.querySelector(".new_input_title").value;
  let strLen = inputTitle.length;
  console.log(strLen);
  document.querySelector(".title-counter").innerHTML = `${strLen} / 100`;

  if (strLen > 100) {
    alert("제목은 최대 100자까지 입력가능합니다");
  }
}