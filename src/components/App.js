import AppRouter from "components/Router";
import { authService } from "fbase";
import { useEffect, useState } from "react";
import { onAuthStateChanged, updateProfile } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false); // 유저 로그인 로드를 기다리기 위한 flag
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 유저 로그인 여부 flag
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setUserObj({
          uid: user.uid,
          displayName: user.displayName
        });
      } else {
        setIsLoggedIn(false); // 유저가 인증되지 않은 경우 flag를 false로 유지
        setUserObj(null);
      }
      setInit(true); // 유저 로그인 되면 set true
    });
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      uid: user.uid,
      displayName: user.displayName
    });
  };
  return (
    <>
      {/* 유저 로그인이 확인 되면 isLoggedIn을 true로 하고 그 전까지는 문구만 출력 */}
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj} />
      ) : (
        "Initializing..."
      )}
    </>
  )
}

export default App;
