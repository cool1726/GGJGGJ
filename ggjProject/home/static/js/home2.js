const posts = document.querySelectorAll(".post-container");

const closedPosts = document.querySelectorAll(".closed-post");
const image = document.querySelectorAll(".closed-img");
const opacity = document.querySelectorAll(".closed-opacity");
const body = document.querySelectorAll(".closed-body");

const openedPosts = document.querySelectorAll(".opened-post");

// 닫혀진 상태
// 각 글 위치는 imgStack이라는 배열을 만들어 계산함 (Column의 개수에 해당하는 길이를 가짐)
// 이미지의 위치는 imgStack의 가장 작은 값과 그 인덱스를 보고 정한다
// 위치를 정한 뒤에는 imgStack의 가장 작은 값에 해당 이미지의 높이를 더한다
// 마지막 차례에는 imgStack의 가장 큰 값을 보고 이미지를 담은 Container 높이를 구한다
const resizeApply = (resizePosts, stack) => {
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

        //opacity[i].height = autoHeight;
        // console.log("image: " + image[i].height);
        // console.log(opacity);
        //console.log(imgStack);
        if (i == posts.length - 1) {
            document.querySelector("#masonry-container").style.height = `${Math.max.apply(0, imgStack)}px`;
        }
    }
}
/** resizeApply 함수 다시 수정하기 
 * - imgStack 스택을 전역으로 사용해 클릭이벤트 처리에서도 빠르게 되도록 하기
 * - 아래 클릭 함수에서도 원상복귀하는 코드 추가하기, 한번에 하나의 글만 열기 가능함 */


// 아예 닫혀진 글 클릭시 원래 해당 글 영역에 있던 글들은 모두 옆으로 밀림
let flag = 0; // 0이면 클릭한 글이 없고, 1이면 이미 클릭한 글이 있음
let onlyOpenPost;
posts.forEach(post => {
    const closedPost = post.querySelector('.closed-post');
    const openedPost = post.querySelector('.opened-post');

    const closeBtnInOpened = openedPost.querySelector('.btn-close');

    console.log(closedPost.classList);

    post.addEventListener("click", () => { // click event 처리
        if (openedPost.classList.contains("hidden")) { // 펼칠 때
            console.log("펼쳐!");
            const closedHeight = closedPost.children[1].height;

            closedPost.style.display = "none";
            closedPost.classList.toggle("hidden");

            openedPost.style.display = "inline-block";
            openedPost.classList.toggle("hidden");

            console.log("closedPost");
            console.log(closedPost);
            console.log("openedPost");
            console.log(openedPost);

            const clickedTop = parseInt(post.style.top);
            const clickedLeft = parseInt(post.style.left);
            const clickedHeight = openedPost.scrollHeight;
            const clickedWidth = openedPost.scrollWidth;
            //console.log(closedPosts);

            onlyOpenPost = post;

            // post-container에 대해 겹치는 글들 모두 아래로 내리기
            for (let i = 0; i < posts.length; i++) {
                if (posts[i] != post) {

                    let postTop = parseInt(posts[i].style.top);
                    let postLeft = parseInt(posts[i].style.left);
                    let postHeight = posts[i].children[0].children[1].height;

                    if (postLeft == clickedLeft && postTop >= clickedTop) {
                        // 클릭한 글 아래에 있으면서 같은 열에 있는 글에 대해 적용
                        posts[i].style.top = `${postTop + clickedHeight - closedHeight}px`;
                        posts[i].classList.add("moved");
                    }
                    else if (postTop + postHeight > clickedTop && postLeft >= clickedLeft && postLeft < clickedLeft + clickedWidth) {
                        // 클릭한 글 위에 있으면서 겹치는 글에 대해 적용 (클릭한 글과는 다른 열에 있는 글)
                        //console.log("wow", posts[i]);
                        posts[i].style.top = `${postTop + clickedHeight - (postTop - clickedTop) + 15}px`;
                        posts[i].classList.add("moved");
                    }
                    else if (postTop >= clickedTop && postLeft >= clickedLeft && postLeft < clickedLeft + clickedWidth) {
                        // 클릭한 글 아래에 있으면서 다른 열에 있는 글에 대해 적용
                        posts[i].style.top = `${postTop + clickedHeight + 15}px`;
                        //console.log(posts[i].style.top);
                        posts[i].classList.add("moved");
                    }
                }
            }
            flag = 1;
        }
        else { // 닫을 때
            console.log("닫아!");

            openedPost.style.display = "none";
            openedPost.classList.toggle("hidden");
            closedPost.style.display = "inline-block";
            closedPost.classList.toggle("hidden");

            console.log("closedPost");
            console.log(closedPost);
            console.log("openedPost");
            console.log(openedPost);

            for (let i = 0; i < posts.length; i++) {
                if (posts[i] != post) {

                }
            }
        }
    });
});

// 한번 열린 글의 X버튼을 누르면 다시 닫힘
// openedPosts.forEach(post => {
//     post.addEventListener("click", () => {
//         console.log("close");
//     });
// });


// 화면 크기가 달라질 때마다 resizeApply() -> column 조정
window.onload = function () {
    window.addEventListener('resize', function () {
        resizeApply();
    });
}

// X를 눌러 해당 글을 닫아주는 함수 
// params : post(해당 post-container)
// const closePostView = (post) => {
//     const closedPost = post.querySelector('.closed-post');
//     const openedPost = post.querySelector('.opened-post');
//     closedPost.style.display = "inline-block";
//     closedPost.classList.toggle("hidden");

//     openedPost.style.display = "none";
//     openedPost.classList.toggle("hidden");
// };

resizeApply();