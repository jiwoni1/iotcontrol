import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const storedUserId = localStorage.getItem("userId"); // localstorage에서 userId 확인

  // 로그인 안했으면 로그인 화면으로 이동동
  if (!storedUserId) {
    return <Navigate to="/" />;
  }
  // 로그인 했으면 자식 컴포넌트 렌더링
  return children;
}
