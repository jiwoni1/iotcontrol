import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Homepage/Home";
import Login from "./pages/Loginpage/Login";
import Layout from "./Layout";
import "./App.css";
import ProtectedRoute from "./routes/ProtectedRoute";
import RedirectIfLoggedIn from "./routes/RedirectIfLoggedIn";

function App() {
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
        {/* Login 페이지는 로그인 상태인 사용자는 접근 불가 */}
        <Route
          path="/"
          element={
            <RedirectIfLoggedIn>
              <Login />
            </RedirectIfLoggedIn>
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;
