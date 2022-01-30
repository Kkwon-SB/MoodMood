<!--  다 갈아엎고 구성 한 일

에디터 사용 시 공식 문서를 제발 좀 잘 읽어보자??
bootstrap  < css < antd 리액트 친화적인 환경 사용하기 권장 -> bootstrap 포기;;
추후에 백엔드 설치된것들은 지워야되나요??
localStorage 구글 임시저장소 어쩌고 하던데 일단 임시저장.. 제가 잘 몰라서 일단은..
jsx는 하나의 기능만 & 기능 확장, js는 여러 기능을 반환한다고 해서.. 일단은 그에 따라서 재구성..

요청은 성공이라고 하는데 KEY_ERROR가 발생함
type 에러같다는..느낌적인 느낌이?
그래서 강제 인증 부분을 만들어서 일단 메인으로 이동하게 만들었습니다.
env 파일에 백엔드 서버를 변경하면 될꺼같은데.. 환경변수는 auto reload가 안되니 재시작 ?? 
css 임의로 처리했습니다 라이브러리 설치 후 간단하게 수정하시면 됩니다.. 혹은 지우고 사용하셔도됩니다

api를 이해 못하시겠다고 해서 signin에 대략적으로 어떻게 쓴건지 넣어놨습니다.
제가 api를 받을 수 없어서 코치님께서 말씀해주신 목업 코드를 넣었습니다..
뭐냐 뭐 수정하니까 실행 후에 터미널창 겁나 부들대는데 ;;;

12월 5일 - 상세페이지, 차트 부분은 아직.. 제가 차트를 할수 있을까요..?
깃 무서워서 일단 보류... F: 상세페이지, 글쓰기 툴바 수정
공감 많은순 <-이 처리는 어떻게? 
12월 6일 - backend 폴더가 없어도 됩니다 근데 이때는 .env랑 .gitignore를 root 폴더와 함께..
ex) frontend 껍데기 없애기
proxy 오류가 나는 것 같아서 제가 잘 못써서 지웠습니다
git에 pull 하고 다시 올리려니까 변한 파일이 너무 많아서 오류가 뜸..
브랜치, history 지우고 다시 재업로드 했습니다.
구현 안된건 열린게시판 공감 많은순
-->

- package manager 통일: `yarn`
- 쓸모없는 패키지 정리하기

```bash
yarn remove @ckeditor/ckeditor5-build-classic @ckeditor/ckeditor5-react antd body-parser bootstrap cors cross-env express mysql2 node-sass nodemon npm quill react-bootstrap react-paginate react-quill react-redux sequelize styled-components typescript vue-codemirror web-vitals @toast-ui/editor-plugin-chart @toast-ui/editor-plugin-code-syntax-highlight @toast-ui/editor-plugin-color-syntax @toast-ui/editor-plugin-table-merged-cell @toast-ui/editor-plugin-uml @toast-ui/react-editor serviceworker
```

- `react-router-dom` 최신 버전으로 업데이트

```bash
yarn add react-router-dom@6 history@5
```

- ui library 추가하기

```bash
yarn add @emotion/react @mui/material @emotion/styled @mui/icons-material
```

- 전체 상태 관리 라이브러리 추가하기

```bash
yarn add recoil
```

- `jsx` 와 `js` 나누기: 리액트 컴포넌트와 그렇지 않은 것들
