import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Homepage/Home";
import Login from "./pages/Loginpage/Login";
import Layout from "./Layout";
import "./App.css";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  // 로그인 상태 유지(자동로그인)
  // const setUserId = useSetRecoilState(userIdState);

  // useEffect(() => {
  //   const storedUserId = localStorage.getItem("userId");
  //   if (storedUserId) {
  //     setUserId(storedUserId);
  //   }
  // }, [setUserId]);
  return (
    <Layout>
      <Routes>
        {/* home은 로그인한 사용자만 접근가능 */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Layout>
  );
}

export default App;
