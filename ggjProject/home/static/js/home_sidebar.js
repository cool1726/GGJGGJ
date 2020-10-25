const main = document.querySelector(".main-container");
const masonry = document.querySelector("#masonry-container");

const posts = document.querySelectorAll(".post-container");

const closedPosts = document.querySelectorAll(".closed-post");
const image = document.querySelectorAll(".closed-img");
const opacity = document.querySelectorAll(".closed-opacity");
const body = document.querySelectorAll(".closed-body");

const openedPost = document.querySelector(".opened-post");
const btnClose = openedPost.querySelector(".btn-close");

const btnOpenBook = openedPost.querySelector(".open-book");
const bookContainer = openedPost.querySelector(".bottom-book-box");

const btnLike = openedPost.querySelector(".likes-box");
const btnScrap = openedPost.querySelector(".scrap-box");

const resizeApply = (cols) => {
    let imgStack = Array.from({ length: cols }, () => 0);
    const colWidth = 295;
    const bottomMargin = 15;
    const minHeight = 160;

    // console.log(imgStack);

    for (let i = 0; i < posts.length; i++) {
        let minIndex = imgStack.indexOf(Math.min.apply(0, imgStack));
        let x = colWidth * minIndex;
        let y = imgStack[minIndex];

        let autoHeight = 0;
        if (body[i].textContent.length < 130) {
            autoHeight = minHeight + Math.floor(Math.random() * 20);
        } else if (body[i].textContent.length > 600) {
            autoHeight = 500 + Math.floor(Math.random() * 100);
        } else {
            autoHeight = Math.floor(body[i].textContent.length * 1.2);
        }

        // 높이는 closed-post로
        // closed-post의 closed-img에 (본문 길이에 따라 계산된) 높이 적용
        posts[i].querySelector('.closed-img').style.height = `${autoHeight}px`;

        imgStack[minIndex] += (autoHeight + bottomMargin);

        // 위치는 post-container로
        // post-container에 relative로 top, left 적용해주기 (나중에 클릭 적용시 겹치는 부분은 아래로 내려감)
        posts[i].style.top = `${y}px`;
        posts[i].style.left = `${x}px`;

        if (i == posts.length - 1) {
            document.querySelector("#masonry-container").style.height = `${Math.max.apply(0, imgStack)}px`;
        }
    }
}


posts.forEach(post => {
    console.log(post.classList);

    post.addEventListener("click", () => { // click event 처리
        console.log("펼쳐!");
        let cols = 0;
        if (window.innerWidth > 1880) {
            cols = 4;
            masonry.style.width = "1180px";
            main.style.width = "1200px";
            openedPost.style.width = `680px`;
        } else if (window.innerWidth > 1248) { // 4열
            cols = 3;
            masonry.style.width = "890px";
            main.style.width = "910px";
            openedPost.style.width = `${window.innerWidth - masonry.clientWidth - 50}px`;
        } else if (window.innerWidth > 950) { // 3열
            cols = 2;
            masonry.style.width = "580px";
            main.style.width = "600px";
            openedPost.style.width = `${window.innerWidth - masonry.clientWidth - 50}px`;
        } else if (window.innerWidth > 650) { // 2열
            cols = 1;
            masonry.style.width = "290px";
            main.style.width = "310px";
            openedPost.style.width = `${window.innerWidth - masonry.clientWidth - 50}px`;
        } else { // 1열
            cols = 1;
            openedPost.style.width = `${window.innerWidth - masonry.clientWidth - 50}px`;
        }
        resizeApply(cols);
        // console.log(main.scrollWidth);
        // console.log(masonry.scrollWidth);


        openedPost.style.display = "flex";
        openedPost.classList.toggle("hidden");

        btnOpenBook.style.display = "block";
        bookContainer.classList.add("hidden");

        openedPost.querySelector(".post-img").src = `${post.children[1].src}`;
        openedPost.querySelector(".post-title").innerHTML = `${post.children[2].innerHTML}`;
        openedPost.querySelector(".post-body").innerHTML = `${post.children[3].innerHTML}`;
        openedPost.querySelector(".pub-date").innerHTML = `${post.children[4].innerHTML}`;
        openedPost.querySelector(".pub-user").innerHTML = `@${post.children[5].innerHTML}`;

        console.log(post.children[6].src);
        openedPost.querySelector(".book-img").src = `${post.children[6].src}`;
        openedPost.querySelector(".book-title").innerHTML = `${post.children[7].innerHTML}`;
        openedPost.querySelector(".book-author").innerHTML = `   by ${post.children[8].innerHTML}`;
        openedPost.querySelector(".book-description").innerHTML = `${post.children[9].innerHTML} ...`;

        openedPost.querySelector(".btn-like").href = `${post.children[10].href}`;
        openedPost.querySelector(".likes-num").innerHTML = `${post.children[11].innerHTML}`;
        if (post.children[12].innerHTML == 'liked') {
            openedPost.querySelector(".like-btn").classList.remove("far");
            openedPost.querySelector(".like-btn").classList.add("fas");
        } else {
            openedPost.querySelector(".like-btn").classList.remove("fas");
            openedPost.querySelector(".like-btn").classList.add("far");
        }

        openedPost.querySelector(".btn-scrap").href = `${post.children[13].href}`;
        openedPost.querySelector(".scrap-num").innerHTML = `${post.children[14].innerHTML}`;
        if (post.children[15].innerHTML == 'scraped') {
            openedPost.querySelector(".scrap-btn").classList.remove("far");
            openedPost.querySelector(".scrap-btn").classList.add("fas");
        } else {
            openedPost.querySelector(".scrap-btn").classList.remove("fas");
            openedPost.querySelector(".scrap-btn").classList.add("far");
        }
    });
})


const openBook = () => {
    btnOpenBook.style.display = "none";
    bookContainer.classList.remove("hidden");
}

const closePostView = () => {
    console.log("닫아!");
    let cols = 0;
    if (window.innerWidth > 1248) { // 4열
        cols = 4;
        masonry.style.width = "1180px";
        main.style.width = "100%";
    } else if (window.innerWidth > 950) { // 3열
        cols = 3;
        masonry.style.width = "890px";
        main.style.width = "100%";
    } else if (window.innerWidth > 650) { // 2열
        cols = 2;
        masonry.style.width = "580px";
        main.style.width = "100%";
    } else { // 1열
        cols = 1;
        main.style.width = "100%";
    }
    resizeApply(cols);
    openedPost.style.display = "none";
    openedPost.classList.toggle("hidden");

    btnOpenBook.style.display = "block";
    bookContainer.classList.add("hidden");
}

window.onload = function () {
    window.addEventListener('resize', function () {
        let cols = 0;
        if (openedPost.classList.contains("hidden")) {
            if (window.innerWidth > 1880) {
                cols = 4;
                masonry.style.width = "1180px";
                main.style.width = "100%";
            } else if (window.innerWidth > 1248) { // 4열
                cols = 4;
                masonry.style.width = "1180px";
                main.style.width = "100%";
            } else if (window.innerWidth > 950) { // 3열
                cols = 3;
                masonry.style.width = "890px";
                main.style.width = "100%";
            } else if (window.innerWidth > 650) { // 2열
                cols = 2;
                masonry.style.width = "590px";
                main.style.width = "100%";
            } else { // 1열
                cols = 1;
                masonry.style.width = "295px";
                main.style.width = "100%";
            }
        } else {
            if (window.innerWidth > 1880) {
                cols = 4;
                masonry.style.width = "1180px";
                main.style.width = "1200px";
                openedPost.style.width = `680px`;
            } else if (window.innerWidth > 1248) { // 4열
                cols = 4;
                masonry.style.width = "890px";
                main.style.width = "905px";
                openedPost.style.width = `${window.innerWidth - masonry.clientWidth - 50}px`;
            } else if (window.innerWidth > 950) { // 3열
                cols = 3;
                masonry.style.width = "590px";
                main.style.width = "600px";
                openedPost.style.width = `${window.innerWidth - masonry.clientWidth - 50}px`;
            } else if (window.innerWidth > 650) { // 2열
                cols = 2;
                masonry.style.width = "295px";
                main.style.width = "310px";
                openedPost.style.width = `${window.innerWidth - masonry.clientWidth - 50}px`;
            } else { // 1열
                cols = 1;
                masonry.style.width = "295px";
                main.style.width = "310px";
                openedPost.style.width = `${window.innerWidth - masonry.clientWidth - 50}px`;
            }
        }
        resizeApply(cols);
    });
}

let cols = 0;
if (window.innerWidth > 1880) {
    cols = 4;
    masonry.style.width = "1180px";
    main.style.width = "100%";
} else if (window.innerWidth > 1248) { // 4열
    cols = 4;
    masonry.style.width = "1180px";
    main.style.width = "100%";
} else if (window.innerWidth > 950) { // 3열
    cols = 3;
    masonry.style.width = "890px";
    main.style.width = "100%";
} else if (window.innerWidth > 650) { // 2열
    cols = 2;
    masonry.style.width = "590px";
    main.style.width = "100%";
} else { // 1열
    cols = 1;
    masonry.style.width = "295px";
    main.style.width = "100%";
}

resizeApply(cols);


// 좋아요, 스크랩 버튼 클릭처리
const likeBtn = openedPost.querySelector(".like-btn");
const scrapBtn = openedPost.querySelector(".scrap-btn");

