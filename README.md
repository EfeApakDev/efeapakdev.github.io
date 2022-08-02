# Description

<br/>

[youngstagram](https://youngstagram-demo.vercel.app)은 typescript, react, firebase 등을 이용하여 백엔드 개발자 없이 인스타그램을 클론코딩하기 위해 만들었다.

- 현재까지 공부한 내용을 어떻게 활용할까 고민해보다 평소 아무 생각없이 자주 접속하던 인스타그램을 만들어보는게 어떨까 하는 생각이 들어 이 프로젝트를 시작하게 되었다.
- 그냥 겉모습만 비슷한 프로젝트가 아닌 실제로 사용할 수 있는 프로젝트를 하고 싶어 firebase를 사용하여 배포까지 진행하였다.

<br/>

# Installation

<br/>

기본적으로 node.js가 설치되어 있어야 하고, firebase 초기 설정 또한 필요하다. node.js 설치가 되어 있다면

```node.js
  npm i
```

를 입력하여 필요한 모듈들을 다운받는다.

<br/>

초기 firebase 설정을 위해 firebase-practice 폴더의 src와 같은 경로에 `FireBase.tsx` 파일을 만든 후 다음과 같이 코드를 작성한다

```typescript
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

const FireBasApp = initializeApp(firebaseConfig);
export const authService = getAuth(FireBasApp);
export const DBService = getFirestore(FireBasApp);
export const storageService = getStorage(FireBasApp);
```

여기서 firebaseConfig는 firebase 공식 홈페이지의 초기설정을 마치면 나오는 코드를 그대로 복사해 사용하면 된다.

<br/>

# Stack

- Programming Langruage:
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" style="border-radius: 5px;"/>
  <img src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white" style="border-radius: 5px;"/>
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" style="border-radius: 5px;"/>
  <img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" style="border-radius: 5px;"/>

- Framework:
  <img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white" style="border-radius: 5px;"/>
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" style="border-radius: 5px;"/>
  <img src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white" style="border-radius: 5px;"/>
- DataBase:
  <img src="https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white" style="border-radius: 5px;"/>

- Deployment:
  <img src="https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white" style="border-radius: 5px;"/>

- IDE:
  <img src="https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white" style="border-radius: 5px;"/>

- Browser Support:
  <img src="https://img.shields.io/badge/Google%20Chrome-4285F4?style=for-the-badge&logo=GoogleChrome&logoColor=white" style="border-radius: 5px;">
  <img src="https://img.shields.io/badge/Firefox-FF7139?style=for-the-badge&logo=Firefox-Browser&logoColor=white" style="border-radius: 5px;">
  <img src="https://img.shields.io/badge/Edge-0078D7?style=for-the-badge&logo=Microsoft-edge&logoColor=white" style="border-radius: 5px;">
