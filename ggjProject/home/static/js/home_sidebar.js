const main = document.querySelector(".main-container");
const masonry = document.querySelector("#masonry-container");

const posts = document.querySelectorAll(".post-container");

const closedPosts = document.querySelectorAll(".closed-post");
const image = document.querySelectorAll(".closed-img");
const opacity = document.querySelectorAll(".closed-opacity");
const body = document.querySelectorAll(".closed-body");

const openedPost = document.querySelector(".opened-post");
const btnClose = openedPost.querySelector(".btn-close");

const resizeApply = (cols) => {
    let imgStack = Array.from({ length: cols }, () => 20);
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
            autoHeight = minHeight;
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
        if (window.innerWidth > 1248) { // 4열
            cols = 3;
            masonry.style.width = "890px";
        } else if (window.innerWidth > 950) { // 3열
            cols = 2;
            masonry.style.width = "580px";
        } else if (window.innerWidth > 650) { // 2열
            cols = 1;
            masonry.style.width = "290px";
        } else { // 1열
            cols = 1;
        }
        resizeApply(cols);
        // console.log(main.scrollWidth);
        // console.log(masonry.scrollWidth);

        openedPost.style.width = `${main.clientWidth - masonry.clientWidth - 70}px`;
        openedPost.style.display = "inline-flex";
        openedPost.classList.toggle("hidden");

        console.log(post.children[1].src);
        openedPost.querySelector(".post-img").src = `${post.children[1].src}`;
        openedPost.querySelector(".post-title").innerHTML = `${post.children[2].innerHTML}`;
        openedPost.querySelector(".post-body").innerHTML = `${post.children[3].innerHTML}`;
        openedPost.querySelector(".pub-date").innerHTML = `${post.children[4].innerHTML}`;
        openedPost.querySelector(".pub-user").innerHTML = `${post.children[5].innerHTML}`;

        // console.log(openedPost.scrollWidth);
    });
})

const openBook = () => {
    console.log();
}

const closePostView = () => {
    console.log("닫아!");
    let cols = 0;
    if (window.innerWidth > 1248) { // 4열
        cols = 4;
        masonry.style.width = "890px";
    } else if (window.innerWidth > 950) { // 3열
        cols = 3;
        masonry.style.width = "580px";
    } else if (window.innerWidth > 650) { // 2열
        cols = 2;
        masonry.style.width = "290px";
    } else { // 1열
        cols = 1;
    }
    resizeApply(cols);
    openedPost.style.display = "none";
    openedPost.classList.toggle("hidden");
}

window.onload = function () {
    window.addEventListener('resize', function () {
        let cols = 0;
        if (window.innerWidth > 1248) { // 4열
            cols = 4;
        } else if (window.innerWidth > 950) { // 3열
            cols = 3;
        } else if (window.innerWidth > 650) { // 2열
            cols = 2;
        } else { // 1열
            cols = 1;
        }
        resizeApply(cols);
    });
}

let cols = 0;
if (window.innerWidth > 1248) { // 4열
    cols = 4;
} else if (window.innerWidth > 950) { // 3열
    cols = 3;
} else if (window.innerWidth > 650) { // 2열
    cols = 2;
} else { // 1열
    cols = 1;
}
resizeApply(cols);