import { Navigate } from "react-router-dom";
// import { useRecoilValue } from "recoil";
// import { userIdState } from "../recoil/atoms/userAtom";

export default function ProtectedRoute({ children }) {
  // const userId = useRecoilValue(userIdState); // recoil에서 로그인 정보 확인
  const storedUserId = localStorage.getItem("userId"); // localstorage에서 userId 확인

  // 로그인 안했으면 로그인 화면으로 이동동
  if (!storedUserId) {
    return <Navigate to="/" />;
  }
  // 로그인 했으면 자식 컴포넌트 렌더링
  return children;
}
