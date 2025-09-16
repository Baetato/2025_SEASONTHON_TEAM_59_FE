import { useUser } from "../states/userContext";
import { Navigate } from "react-router-dom";

// 토큰만 확인 (로그인 필요)
export function ProtectedRoute({ children }) {
  const token = localStorage.getItem("accessToken");
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

// 토큰 있는 사람 접근 제한 (로그인 페이지)
export function PublicRoute({ children }) {
  const { user } = useUser();
  const token = localStorage.getItem("accessToken");

  if (token && user.nickname && user.nickname !== "null#null") {
    return <Navigate to="/home-stage" replace />;
  }
  return children;
}

// 닉네임 설정 안된 사용자만 접근
export function NicknameRoute({ children }) {
  const { user } = useUser();
  const token = localStorage.getItem("accessToken");

  if (!token) return <Navigate to="/login" replace />;
  if (user.nickname && user.nickname !== "null#null") {
    return <Navigate to="/home-stage" replace />;
  }
  return children;
}