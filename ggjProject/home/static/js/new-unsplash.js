/* new.html 파일에 들어가는 Unsplash API 처리 js 파일입니다. */

//unsplash 자동완성 
$(document).ready(function () {
    $('#unsplashSearch').keyup(function () {
        if ($(this).val() == '') {
            $("#unsplashResult *").remove();
            $('#unsplashResult').append('<p>검색어를 입력해주세요 </p>')
        } else {
            $('#unsplashResult').html('');
            var searchField = $('#unsplashSearch').val();
            $.getJSON("https://api.unsplash.com/search/photos?page=1&query=" + searchField +
                "&client_id=6YvVbroc-hwUBpgp89bjK5fgUs-_eSSH6dyPjDuqmYw&per_page=20",
                function (data) {
                    // console.log(data);
                    $("#unsplashResult *").remove();
                    $.each(data, function (key, value) {
                        if (value.length == 0) {
                            $('#unsplashResult').append('<p>검색결과가 없습니다. </p>')
                        } else {
                            $("#unsplashResult *").remove();
                            data.results.forEach(item => {
                                image =
                                    `<div class="list_item">
                                        <img class="list_img" src="${item.urls.thumb}"/> <p class="list_text noto-light gray">by ${item.user.first_name} ${item.user.last_name}</p>
                                        </div>`
                                $("#unsplashResult").append(image)
                            });
                        }
                    })
                })
        }

    });
});