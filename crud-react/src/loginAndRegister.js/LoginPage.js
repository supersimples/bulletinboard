import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate, Navigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import { AiOutlineClose } from "react-icons/ai";

import StyledHr from "../styledComponents.js/StyledHr";
import { Background, RegisterBox, RegisterTitle, StyledForm, LoginBtn, FailedMsg, FailedMsgBox } from "../styledComponents.js/LoginStyle";

const LoginBox = RegisterBox;
const LoginTitle = styled(RegisterTitle)`
  margin-bottom: 70px;
`;
const StyledForms = styled(StyledForm)`
  input {
    margin: 5px auto 30px;
  }
`;

function LoginContent() {
  const queryClient = useQueryClient();
  
  // login 상태에 따라 페이지 뷰 핸들링
  const [isLoggedIn, setIsLoggedIn] = useState('initial');

  const getLogin = async (inputData) => {
    const {data} = await axios.post('/account/login', inputData);
    return data;
  };
  
  const {mutate} = useMutation(getLogin, {
    onSuccess: () => {
      setIsLoggedIn('succeeded');
      queryClient.invalidateQueries('checkLogin');
    },
    onError: () => {
      setIsLoggedIn('failed');
    }
  });

  const loginSubmit = (event) => {
    event.preventDefault();
    setIsLoggedIn('initial');

    const e = event.target;
    const value = [e.user_id.value, e.password.value];
    const [user_id, password] = value;

    mutate({user_id, password});
  };


  if(isLoggedIn === 'succeeded') return (
    <Navigate to="/" replace={true}/>
  );
  return (
    <>
      <StyledForms onSubmit={event=>loginSubmit(event)}>
        <div>
          <p>아이디</p>
          <input placeholder='아이디' name="user_id" maxLength='20' required />
        </div>
        <div>
          <p>비밀번호</p>
          <input placeholder='비밀번호' name="password" type='password' maxLength='20' required autoComplete="on"/>
        </div>
        <LoginBtn>로그인</LoginBtn>
        <FailedMsgBox>
          <FailedMsg>
            {isLoggedIn ==='failed'  && <div>아이디 또는 비밀번호가 일치하지 않습니다</div>}
          </FailedMsg>
        </FailedMsgBox>
      </StyledForms>
    </>
  );
};

function LoginPage() {
  const navigate = useNavigate();
  const toHome = () => {
    navigate('/');
  }
  
  return (
    <Background>
      <LoginBox>
        <LoginTitle>
          login
          <AiOutlineClose className="closeBtn" onClick={toHome} />
          <StyledHr loginPage/>
        </LoginTitle>
        <LoginContent />
      </LoginBox>
    </Background>
  );
}

export default LoginPage;