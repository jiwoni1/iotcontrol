import { Navigate } from "react-router-dom";

export default function RedirectIfLoggedIn({ children }) {
  const isLoggedIn = JSON.parse(localStorage.getItem("logined"))?.logined;

  if (isLoggedIn) {
    return <Navigate to="/home" replace />; // 로그인 상태라면 홈으로 리디렉션
  }

  return children; // 비로그인 상태라면 그대로 렌더링
}
