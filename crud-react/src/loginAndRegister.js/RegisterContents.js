import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useState } from "react";
import { Navigate } from "react-router-dom";

import { validateRegister } from "./validateRegister";
import { StyledForm, LoginBtn, FailedMsgBox, FailedMsg } from '../styledComponents.js/LoginStyle';

const initialValid = {
  email: 'initial',
  nickname: 'initial',
  id: 'initial',
  password: 'initial',
  passValid: false
};

function RegisterContents() {
  const queryClient = useQueryClient();

  // register 상태에 따라 페이지 뷰 핸들링
  const [isValid, setIsValid] = useState(initialValid);
  const [isRegistered, setIsRegistered] = useState(false);

  const getRegister = async (inputData) => {
    const {data} = await axios.post('/account/register', inputData);
    return data;
  };

  const {mutate} = useMutation(getRegister, {
    onSuccess: () => {
      setIsRegistered(true);
      queryClient.invalidateQueries('checkLogin');
    },
    onError: data => {
      // server에서 error status를 전달했다면 data는 error객체가 된다
      // status와 함께 data를 send했을 경우 data.response.data를 통해 추출한다
      if (data.response.data === 'duplicate_email') {
        setIsValid({
          ...isValid,
          email: 'duplicate_email',
        });
        return;
      }
      if (data.response.data === 'duplicate_id') {
        setIsValid({
          ...isValid,
          id: 'duplicate_id',
        });
        return;
      }
    }
  });

  const registerSubmit = event => {
    event.preventDefault();

    const e = event.target;
    const value = [e.email.value, e.nickname.value, e.user_id.value, e.password.value];
    const [email, nickname, user_id, password] = value;

    // 입력받은 가입 정보 유효성 검사
    const isValid = validateRegister({email, nickname, user_id, password});
    setIsValid(isValid);

    // 유효성 검사 통과시 mutate
    if (isValid.passValid) {
      mutate({email, nickname, user_id, password});
    }
  };


  if(isRegistered) return (
    <Navigate to="/" replace={true} />
  );
  return (
    <>
      <StyledForm onSubmit={event=>registerSubmit(event)}>
        <div>
          <p>이메일</p>
          <input placeholder='이메일' name="email" maxLength='64' required/>
          <FailedMsgBox>
            {!isValid.email && <FailedMsg>이메일의 형식이 올바르지 않습니다</FailedMsg>}
            {isValid.email === 'duplicate_email' && <FailedMsg>이미 가입된 이메일 입니다</FailedMsg>}
          </FailedMsgBox>
        </div>
        <div>
          <p>닉네임</p>
          <input placeholder='닉네임' name="nickname" maxLength='15' required/>
          <FailedMsgBox>
            {!isValid.nickname && 
              <FailedMsg>
                닉네임은 특수문자 없이 2~15글자 이어야 합니다
              </FailedMsg>
            }
          </FailedMsgBox>
        </div>
        <div>
          <p>아이디</p>
          <input placeholder='아이디' name="user_id" maxLength='20' required/>
          <FailedMsgBox>
            {!isValid.id && <FailedMsg>아이디는 특수문자 없이 4~20글자 이어야 합니다</FailedMsg>}
            {isValid.id === 'duplicate_id' && <FailedMsg>이미 가입된 아이디 입니다</FailedMsg>}
          </FailedMsgBox>
        </div>
        <div>
          <p>비밀번호</p>
          <input placeholder='비밀번호' name="password" type='password' maxLength='20' required autoComplete="on"/> 
          <FailedMsgBox>
            {!isValid.password && 
              <FailedMsg>
                비밀번호는 영문자, 숫자, 특수문자 포함하여 6~20글자여야 합니다
              </FailedMsg>
            }
          </FailedMsgBox>
        </div>
        <LoginBtn>회원가입</LoginBtn>
      </StyledForm>
    </>
  );
};

export default RegisterContents;