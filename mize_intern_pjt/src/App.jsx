import { useEffect } from "react";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { userIdState } from "./recoil/atoms/userAtom";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Homepage/Home";
import Login from "./pages/Loginpage/Login";
import Layout from "./Layout";
import "./App.css";

function App() {
  // 로그인 상태 유지(자동로그인)
  const setUserId = useSetRecoilState(userIdState);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, [setUserId]);
  return (
    <RecoilRoot>
      <Layout>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Layout>
    </RecoilRoot>
  );
}

export default App;
