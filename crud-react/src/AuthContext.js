import axios from "axios";
import { useContext, createContext } from "react";
import { useQuery } from "react-query";
import { useState } from "react";

const AuthContext = createContext();
const AuthStatusContext = createContext();

// 로그인 상태 및 로그인 유저 정보 context
export default function AuthProvider({ children }) {
  const [status, setStatus] = useState();

  const checkLogin = async () =>{
    const {data} = await axios.get('/account/checklogin');  
    return data;
  };

  // 로그인 상태 확인 query
  // 초기값 설정시 status가 success로 돼서 따로 상태값으로 만듦
  const {data} = useQuery(['checkLogin'], checkLogin, {
    initialData: {
      isLoggedIn: false,
      loginUser_id: null,
      loginUser_nickname: null
    },
    onSuccess: () => setStatus("success")
  });

  return (
    <AuthContext.Provider value={data}>
      <AuthStatusContext.Provider value={status}>
        {children}
      </AuthStatusContext.Provider>
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  return context;
}

export function useAuthStatusContext() {
  const context = useContext(AuthStatusContext);
  return context;
}