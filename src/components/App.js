import AppRouter from "components/Router";
import { authService } from "fbase";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false); // 유저 로그인 로드를 기다리기 위한 flag
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 유저 로그인 여부 flag
  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setIsLoggedIn(true); // 유저가 인증된 경우 로그인 flag를 true로 변경        
      } else {
        setIsLoggedIn(false); // 유저가 인증되지 않은 경우 flag를 false로 유지
      }
      setInit(true); // 유저 로그인 되면 set true
    });
  }, []);
  return (
    <>
      {/* 유저 로그인이 확인 되면 isLoggedIn을 true로 하고 그 전까지는 문구만 출력 */}
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initializing..."}
      <footer>&copy; Nwitter-Marco {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
