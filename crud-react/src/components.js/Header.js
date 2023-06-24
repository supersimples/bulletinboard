import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import LoginBlock from "./LoginBlock";
import StyledHr from "../styledComponents.js/StyledHr";

const WrapperHead = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  background-color: white;
  z-index: 1;
`;

const StyledHead = styled.div`
  width: 1519px;
  height: 70px;
  color: #black;
  background-color: white;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
`;
const Title = styled.div`
  font-family: 'Signika', sans-serif;
  font-weight: 400;
  font-size: 32px;
  padding-left: 40px;

  &:hover {
    cursor: pointer;
  }
`;

const LoginRegisterBtn = styled.div`
  display: flex;
  padding-right: 40px;
  font-size: 15px;
`;

function Header() {
  const navigate = useNavigate();
  
  const moveToHome = () => {
    navigate('/', {replace: true});
  };

  return (
    <>
      <WrapperHead>
        <StyledHead>
          <Title onClick={moveToHome}>
            Bulletin Board
          </Title>
          <LoginRegisterBtn>
            <LoginBlock />
          </LoginRegisterBtn>
        </StyledHead>
        <StyledHr header/>
      </WrapperHead>
      <Outlet />
    </>
  );
}

export default Header;