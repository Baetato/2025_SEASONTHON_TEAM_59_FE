import { Link } from "react-router-dom";

function cameraMain() {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>카메라 기능 테스트</h1>
      <Link to="/camera">
        <button
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          카메라 테스트 페이지 이동
        </button>
      </Link>
    </div>
  );
}

export default cameraMain;