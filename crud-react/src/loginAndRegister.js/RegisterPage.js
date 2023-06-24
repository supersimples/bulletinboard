import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

import RegisterContents from "./RegisterContents";
import StyledHr from "../styledComponents.js/StyledHr";
import { Background, RegisterBox, RegisterTitle } from '../styledComponents.js/LoginStyle';

function RegisterPage() {
  const navigate = useNavigate();
  const toHome = () => {
    navigate('/');
  }

  return (
    <Background>
      <RegisterBox>
        <RegisterTitle>
          register
          <AiOutlineClose className="closeBtn" onClick={toHome} />
          <StyledHr loginPage/>
        </RegisterTitle>
        <RegisterContents />
      </RegisterBox>
    </Background>
  );
}

export default RegisterPage;