const posts = document.querySelectorAll(".post-container");

const closedPosts = document.querySelectorAll(".closed-post");
const image = document.querySelectorAll(".closed-img");
const opacity = document.querySelectorAll(".closed-opacity");
const body = document.querySelectorAll(".closed-body");

const openPost = () => {
    closedPost.classList.add("hidden");
}

posts.forEach(post => {
    post.addEventListener("click", () => {
        //console.log(post.children);
        const closedPost = post.children[0];
        const openedPost = post.children[1];
        const location = closedPost.style.transform;
        openedPost.style.transform = location;
        console.log()

        closedPost.style.display = "none";
        closedPost.classList.add("hidden");
        openedPost.classList.remove("hidden");
    });
});

const strToDate = (obj) => {
    let year = obj.substring(0, 4);
    let month = obj.substring(5, 7);
    let day = obj.substring(8, 10);
    return `${year}.${month}.${day}`;
}

// 각 글 위치는 imgStack이라는 배열을 만들어 계산함 (Column의 개수에 해당하는 길이를 가짐)
// 이미지의 위치는 imgStack의 가장 작은 값과 그 인덱스를 보고 정한다
// 위치를 정한 뒤에는 imgStack의 가장 작은 값에 해당 이미지의 높이를 더한다
// 마지막 차례에는 imgStack의 가장 큰 값을 보고 이미지를 담은 Container 높이를 구한다
const resizeApply = () => {
    let cols;
    if (window.innerWidth > 1248) { // 4열
        cols = 4;
    } else if (window.innerWidth > 950) { // 3열
        cols = 3;
    } else if (window.innerWidth > 650) { // 2열
        cols = 2;
    } else { // 1열
        cols = 1;
    }
    let imgStack = Array.from({ length: cols }, () => 0);
    const colWidth = 295;
    const bottomMargin = 15;
    const minHeight = 160;

    console.log(imgStack);

    for (let i = 0; i < closedPosts.length; i++) {
        let minIndex = imgStack.indexOf(Math.min.apply(0, imgStack));
        let x = colWidth * minIndex;
        let y = imgStack[minIndex];

        let autoHeight = 0;
        if (body[i].textContent.length < 130) {
            autoHeight = minHeight;
        } else {
            autoHeight = body[i].textContent.length * 1.2;
        }

        image[i].height = autoHeight;

        imgStack[minIndex] += (autoHeight + bottomMargin);
        closedPosts[i].style.transform = `translateX(${x}px) translateY(${y}px)`;

        opacity[i].height = Math.floor(autoHeight);
        // console.log("image: " + image[i].height);
        // console.log(opacity);
        //console.log(imgStack);
        if (i == closedPosts.length - 1) {
            document.querySelector(".masonry-container").style.height = `${Math.max.apply(0, imgStack)}px`;
        }
    }
}

const firstClick = () => {

}

window.onload = function () {
    window.addEventListener('resize', function () {
        resizeApply();
    });
}

resizeApply();