<2020.09.05 블랙>
- login 화면 수정 (login.html, account app css 파일, account app views.py 등 파일 수정)
- 로그인, 회원가입 화면 중앙 정렬 클래스 수정 (.acc-position), 로그인유지 체크박스 check event 디자인
- 아직 회원가입은 수정 안했는데 다른거 고칠건 없고 디테일 손 보는 거라 천천히 할게요
## 읽어주세요! ##
css 파일 작성할 때, color와 font는 직접 스타일 지정하지 말고, base.css 에 있는 클래스 사용해서 html에 class 이름 추가해주세요.
아래 예시의 beige paybooc-light 처럼 컬러, 폰트 클래스 이름으로 활용해주세요. (컬러나 폰트 변경이 필요한 경우는 js로 처리하기)
    <div class="blank beige login-guide-txt paybooc-light">
        <a class="login-guide-txt" href="#">ID/PW 찾기</a> | <a class="login-guide-txt" href="#">회원가입</a>
    </div>

<2020.09.06 좌니>
- ReadMe.txt 만들어 놨어요!
- 완료된 작업이나 주의할 작업에 대해서 알려주실 내용이 있으면 여기에 적어주세요~

<2020.09.12 백>
- create 함수 오류 고쳤습니다. back_new에서 바뀐부분 주석처리 해줬으니까 참고해주세요. 
- urls.py에 back_create 추가해줬습니다.