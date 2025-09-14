// states/userContext.js
import { createContext, useState, useContext, useEffect } from "react";
import api from "../api/api.js";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    nickname: "",
    picture: "",
    level: 0,
    exp: 0,
    point: 0,
  });

  const fetchUser = async () => {
    try {
      const res = await api.get("/v1/members");
      console.log("사용자 정보:", res.data.data);
      const data = res.data.data;

      // Context 형식에 맞게 필요한 필드만 추출
      const userData = {
        nickname: data.nickname,
        picture: data.picture,
        level: data.level,
        exp: data.exp,
        point: data.point,
      };

      setUser(userData);
    } catch (err) {
      console.error("사용자 정보 조회 실패:", err);
    }
  };

  const updateUser = (userData) => {
    setUser((prev) => ({ ...prev, ...userData }));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, updateUser, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);