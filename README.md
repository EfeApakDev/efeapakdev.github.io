# 1. 로그인 기능 구현 (Email, Google, GitHub)

<br/><br/>

## - 홈페이지 (Email 로그인)

<br/>

##### 홈페이지 첫 화면에서 아래와 같이 useEffect를 사용하여 현재 로그인 여부를 판별한다. 만약 로그인이 되어 있다면 현재 로그인 된 계정의 이메일을 화면에 보여주고 그렇지 않다면 auth페이지로 넘어가 회원가입 또는 로그인을 하도록 설정 하였다.

<br/>

```typescript
useEffect(() => {
  onAuthStateChanged(authService, (user) => {
    if (user) {
      if (user.email !== null) setCurrentUserEmail(user.email);
      return;
    }
    router.push("/auth");
  });
}, []);

return <span>환영합니다!! {currentUserEmail}님!</span>;
```

<br/>

## - auth 페이지

<br/>

##### auth 페이지에는 Email과 Password를 입력하는 두 input이 있고, 로그인 회원가입 버튼이 있다. 처음 auth 페이지가 랜더링 되면 로그인 버튼에는 Log In이 쓰여있고, 회원 가입을 클릭할 시 isNewAccount가 true가 되면서 해당 버튼에 Create Account가 쓰여지게 된다.

<br/>

```typescript
return (
  <>
    <input type="text" placeholder="Email" />
    <input type="password" placeholder="Password" />
    <input
      type="submit"
      value={isNewAccount ? "Create Account" : "Log in"}
      onSubmit={handleSubmit}
    />
    <button
      onClick={() => {
        setIsNewAccount(true);
      }}
    >
      회원 가입
    </button>
  </>
);
```

<br/>

##### Email과 Password를 다 입력한 후 Submit이벤트가 발생하게 되면 아래의 handleSubmit 함수가 실행된다.

<br/>

```typescript
const handleSubmit: React.FormEventHandler<HTMLFromElement> = (event) => {
  event.preventDefault();
  if (isNewAccount === true) {
    createUserWithEamilAndPassword(authService, Email, Password).then(
      (response) => {
        if ((response.operationType = "signIn")) {
          signOut(authService);
          setIsNewAccount(false);
          alert(
            "회원가입에 성공 하셨습니다! 회원가입하신 정보로 로그인 바랍니다."
          );
          setEmail("");
          setPassword("");
        }
      }
    );
    return;
  }
  signInWithEmailAndPassword(authService, Email, Password).then((response) => {
    if (response.operationType === "signIn") {
      router.push("/");
    }
  });
};
```

<br/>

##### 위 함수는 다음의 2가지의 역할을 수행한다.

##### 1. isNewAccount가 참이라면 (회원가입 버튼을 클릭했다면) firebase의 `createUserWithEmailAndPassword(Auth, Email, Password)`함수를 사용하여 회원 가입을 진행하고, 회원 가입이 정상적으로 완료 되면 회원가입 된 정보를 통해 로그인을 진행하도록 한다.

##### 2. isNewAccount가 거짓이라면 (회원가입 버튼을 클릭하지 않았다면) firebase의 `signInWithEmailAndPassword(Auth, Email, Password)`함수를 사용하여 로그인을 진행하고, 로그인이 성공적으로 완료 되면 홈페이지로 이동시킨다.

<br/>
<br/>

##### +위 함수에서 사용되는 `router`는 Next.js의 `useRouter`를 사용한 것이다. `router.push('link')`를 사용하면 link로 이동하게 된다.

```typescript
import { useRouter } from "next/router";

const router = useRouter();
```

<br/>

##### +위 함수에서 사용되는 `authService`는 firebase의 `getAuth`함수를 사용한 것이다.

```typescript
const FireBasApp = initializeApp(firebaseConfig);
export const authService = getAuth(FireBasApp);
```

<br/>

---

## - Google, GitHub 로그인

<br/>

##### firebase에서 제공하는 google, github 로그인 방식은 매우 간단하다. `GithubAuthProvider`, `GoogleAuthProvider` 이 두 객체를 생성하고 `signInWithPopup(Auth, provider)`함수를 사용하면 쉽게 googe, github 로그인을 구현할 수 있다.

```typescript
const handleGoogleAuth = () => {
  const googleProvider = new GoogleAuthProvider();
  signInWithPopup(authService, googleProvider).then((response) => {
    if (response.operationType === "signIn") {
      router.push("/");
    }
  });
};

const handleGitHubAuth = () => {
  const githubProvider = new GithubAuthProvider();
  signInWithPopup(authService, githubProvider).then((response) => {
    if (response.operationType === "signIn") {
      router.push("/");
    }
  });
};

return (
  <>
    <button onClick={handleGoogleAuth}>Continue with Google</button>
    <button onClick={handleGitHubAuth}>Continue with GitHub</button>
  </>
);
```

##### google 로그인, github 로그인 버튼을 클릭하였을 때 각각 `handleGoogleAuth`, `handleGitHubAuth` 함수가 실행되는데 해당 함수가 호출되면 함수 내에서 `GithubAuthProvider`, `GoogleAuthProvider`를 사용하여 새로운 provider를 생성하고 이를 `signInWithPopup(Auth, provider)`함수의 인자로 전달한 후 로그인이 성공되면 홈페이지로 이동하는 방식으로 로그인을 구현하였다.