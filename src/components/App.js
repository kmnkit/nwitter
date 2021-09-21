import AppRouter from "components/Router";
import { authService } from "fbase";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import GlobalStyles from './GlobalStyles';
import useTitle from 'components/useTitle';
import './scss/main.scss';

function App() {
  const [init, setInit] = useState(false); // 유저 로그인 로드를 기다리기 위한 flag
  const [userObj, setUserObj] = useState(null);

  const changeTitle = useTitle();

  useEffect(() => {
    changeTitle('Home');
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setUserObj({
          uid: user.uid,
          displayName: user.displayName
        });
      } else {
        setUserObj(false);
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
    <div className="App">
      {/* 유저 로그인이 확인 되면 isLoggedIn을 true로 하고 그 전까지는 문구만 출력 */}
      <GlobalStyles />
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj} />
      ) : (
        "Initializing..."
      )}
    </div>
  )
}

export default App;
