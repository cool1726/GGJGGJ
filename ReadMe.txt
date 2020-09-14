<2020.09.05 블랙>
- login 화면 수정 (login.html, account app css 파일, account app views.py 등 파일 수정)
- 로그인, 회원가입 화면 중앙 정렬 클래스 수정 (.acc-position), 로그인유지 체크박스 check event 디자인
## 읽어주세요! ##
css 파일 작성할 때, color와 font는 직접 스타일 지정하지 말고, base.css 에 있는 클래스 사용해서 html에 class 이름 추가해주세요.
아래 예시의 beige paybooc-light 처럼 컬러, 폰트 클래스 이름으로 활용해주세요. (컬러나 폰트 변경이 필요한 경우는 js로 처리하기)
    <div class="blank login-guide-txt beige paybooc-light">
        <a class="login-guide-txt" href="#">ID/PW 찾기</a> | <a class="login-guide-txt" href="#">회원가입</a>
    </div>

<2020.09.06 좌니>
- ReadMe.txt 만들어 놨어요!
- 완료된 작업이나 주의할 작업에 대해서 알려주실 내용이 있으면 여기에 적어주세요~

<2020.09.09 블랙>
- 회원가입 화면 디테일(margin, padding, font, checkbox etc)이랑 에러텍스트 추가함 (views.py에서 에러텍스트 한글로 바꿨어요)
- new.html 파일이랑 new.css 파일 추가함 (텍스트작성과 이미지업로드, 책장선택은 이미 구현됨)
- 앞으로 해야할 일 : new.html 로컬 파일업로드 javascript 사용 또는 css 수정 필요! + 책장선택 드롭다운 디자인!

<2020.09.12 백>
- create 함수 오류 고쳤습니다. back_new에서 바뀐부분 주석처리 해줬으니까 참고해주세요. 
- urls.py에 back_create 추가해줬습니다.

<2020.09.13 백>
- bookmodel 생성했습니다!
- create할 때 book검색후 선택해주세요. 
- views.py에 create함수 수정해줬어요(book save되게!)

<2020.09.13 블랙> 
- new.html에 back_new.html 업데이트된 내용들 수정했고, unsplash input label도 추가했습니다 
- 궁금한 거: 글 작성 화면에서(/back_new) 사진 업로드하면 이미지 미리보기는 어떤식으로 보여주는게 좋을까요?

<2020.09.14 백>
- unsplash API 페이지 따로 만들어서 연습했어요. 아직 구현 안함