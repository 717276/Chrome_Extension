# Chrome_Extension

background.js : 브라우저영역 , 로그인 확인
content.js : 웹페이지 , DOM 상호작용

# 개발 단계
1. 로그인 확인
2. 특정 페이지 접근 여부 확인
3. 페이지 접근시 데이터 검증
4. 결과 값 return 

# 개발 기간
1/25 ~ 2/1 

# 문제
1. 도메인별 데이터 공유가 안된다-> chrome storage local은 도메인 별로 따로 저장소가 존재하기 때문이다.</br>
background 의 storage local 에 저장할 경우 sendMessage 와 addListener로 데이터를 공유할 수 있다.</br>
2. background 파일 실행이 안됨-> manifest version 문제 service_worker 라는 이벤트핸들러가 제대로 동작하지 않아서 -> 일단 version 변경
   
