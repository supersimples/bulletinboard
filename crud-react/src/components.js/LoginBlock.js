import axios from "axios";
import styled, { css } from "styled-components";
import { useQuery, useQueryClient } from "react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useAuthContext, useAuthStatusContext } from "../AuthContext";
import StyledHr from "../styledComponents.js/StyledHr";

const Login = styled.div`
  cursor: pointer;
  text-align: right;
  margin-right: 10px;
`;
const Register = styled.div`
  cursor: pointer;
  text-align: right;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const UserBlock = styled.div`
  position: relative;
`;
const UserName = styled.div`
  cursor: pointer;
`;
const UserMenuBar = styled.div`
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2);
  background-color: white;
  width: 200px;
  height: 200px;
  padding: 10px;
  text-align: center;

  position: absolute;
  top: 30px;
  right: 0px;

  display: none;

  ${props => 
    props.visible &&
    css`
      display: block;
    `
  }
`;
const UserMenuItem = styled.div`
  height: 30px;
  margin-top: 25px;
  cursor: pointer;
`;

function LoginBlock() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {isLoggedIn, loginUser_nickname} = useAuthContext();
  const status = useAuthStatusContext();

  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // logout click시 logoutQuery 실행
  const logout = () => {
    setIsLoggedOut(true);
    navigate('/');
  };

  // logout시 access token 삭제 요청 api
  const removeAccessToken = async () => {
    await axios.get('/account/logout');
  };

  const {} = useQuery(['logout'], removeAccessToken, {
    enabled: !!isLoggedOut, // isLoggedOut을 논리값으로 확실하게 변경
  // access token 삭제 후 checkLogin query refetch
    onSuccess: () => queryClient.invalidateQueries('checkLogin')
  });

  const moveToUserPage = () => {
    navigate(`/users/${loginUser_nickname}`);
  };

  // user menu바 show 핸들링
  const handleShowMenu = () => {
    setIsVisible(!isVisible);
  };

  //checkLogin fetch 이전
  if(status !== "success") return null;
  // 로그인 상태에 따라 로그인/회원가입 버튼 | 유저메뉴바 노출
  return (
    <>
      {!isLoggedIn &&
        <>
          <Login>
            <StyledLink to='/login'>Login /</StyledLink>
          </Login>
          <Register>
            <StyledLink to='/register'>Register</StyledLink>
          </Register>
        </>
      }
      {isLoggedIn &&
        <UserBlock>
          <UserName onClick={handleShowMenu}>
            <span>Welcome, </span> 
            <span style={{color: 'blue'}}>{loginUser_nickname}</span>
            <span> !</span>
          </UserName>
          <UserMenuBar visible={isVisible}>
            <UserMenuItem>{loginUser_nickname}</UserMenuItem>        
            <StyledHr default/>    
            <UserMenuItem onClick={moveToUserPage}>mypage</UserMenuItem>
            <UserMenuItem onClick={logout}>logout</UserMenuItem>
          </UserMenuBar>
        </UserBlock>
      }
    </>
  );
}

export default LoginBlock;