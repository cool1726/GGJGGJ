window.onload = () => {
    let posts = document.querySelectorAll(".closed-post");
    let image = document.querySelectorAll(".closed-img");
    let body = document.querySelectorAll(".closed-body");
    let imgStack = [0, 0, 0, 0];
    const colWidth = 310;
    const bottomMargin = 20;
    const minHeight = 160;

    // 각 글 위치는 imgStack이라는 배열을 만들어 계산함 (Column의 개수에 해당하는 길이를 가짐)
    // 이미지의 위치는 imgStack의 가장 작은 값과 그 인덱스를 보고 정한다
    // 위치를 정한 뒤에는 imgStack의 가장 작은 값에 해당 이미지의 높이를 더한다
    // 마지막 차례에는 imgStack의 가장 큰 값을 보고 이미지를 담은 Container 높이를 구한다
    for (let i = 0; i < posts.length; i++) {
        let minIndex = imgStack.indexOf(Math.min.apply(0, imgStack));
        let x = colWidth * minIndex;
        let y = imgStack[minIndex];
        console.log(`image height : ${image[i].height}`);

        let autoHeight = 0;
        if (body[i].textContent.length < 130) {
            autoHeight = minHeight;
        } else {
            autoHeight = body[i].textContent.length * 1.2;
        }
        image[i].height = autoHeight;
        imgStack[minIndex] += (autoHeight + bottomMargin);
        posts[i].style.transform = `translateX(${x}px) translateY(${y}px)`;
        console.log(minIndex, x, y);

        if (i == posts.length - 1) {
            document.querySelector(".masonry-container").style.height = `${Math.max.apply(0, imgStack)}px`;
        }
    }
}