// import { Navigate } from "react-router-dom";

// export default function ProtectedRouteLogin({ children }) {
//   const isLoggedIn = localStorage.getItem("logined");

//   // 로그인했으면 로그인 페이지로 이동 못하게 함
//   if (isLoggedIn && window.location.pathname === "/") {
//     return <Navigate to="/home" />;
//   }

//   // 로그인 안했으면 로그인 화면으로 이동
//   if (!isLoggedIn) {
//     return <Navigate to="/" />;
//   }

//   // 로그인 했으면 자식 컴포넌트 렌더링
//   return children;
// }

import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isLoggedIn = JSON.parse(localStorage.getItem("logined"))?.logined;

  if (!isLoggedIn) {
    return <Navigate to="/" replace />; // 비로그인 상태라면 로그인 페이지로 리디렉션
  }

  return children; // 로그인 상태라면 컴포넌트 렌더링
}
