import styled, { keyframes, css } from "styled-components";
import { lighten } from "polished";
import { useNavigate } from "react-router-dom";

import StyledHr from "../styledComponents.js/StyledHr";

const WrapperMainManu = styled.div`
  z-index: 1;
  position: fixed;
  left: -100%;
  width: 100%;
  height: 100%;
  background-color: gray;

  ${props => 
    props.displayMenu && css`
      animation: ${displayMenu} 1s ease forwards;
    `
  }

  ${props => 
    props.hideMenu && css`
      animation: ${hideMenu} 1s ease forwards;
    `
  }
`;

const displayMenu = keyframes`
  from {
    left: -100%;
    background-color: gray;
  }
  to {
    left: 0;
    background-color: white;
  }
`;

const hideMenu = keyframes`
  from {
    left: 0;
    background-color: white;
  }
  to {
    left: -100%;
    background-color: gray;
  }
`;

const MainMenuBar = styled.div`
  width: 900px;
  height: 745px;
  margin: 40px auto;
  text-align: center;
`;

const MainMenuItem = styled.div`
  width: 300px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: 300;
  cursor: pointer;
  margin: 10px auto;
  transition: 0.1s;

  &:hover {
    font-size: 29px;
    color: gray;
  }
`;

const MenuBtn = styled.div`
  position: absolute;
  width: 120px;
  height: 100px;
  right: -5%;
  top: 30%;
  border-radius: 10%;
  background-color: ${lighten(0.8, 'black')};
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: right;
  align-items: center;

  &:hover {
    cursor: pointer;
    background-color: ${lighten(0.6, 'black')};
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);

    div {
      color: white;
    }
  }
  
  div:first-child {
    margin-right: 10px;
  }
`;

function MainMenu({displayMenu, hideMenu, onClick}) {
  const navigate = useNavigate();

  const moveToBulletin = (type) => navigate(`/bulletin/${type}`);

  return (
    <WrapperMainManu displayMenu={displayMenu} hideMenu={hideMenu}>
      <MenuBtn onClick={onClick}>
        <div>MENU</div>
      </MenuBtn>
      <MainMenuBar>
        <MainMenuItem onClick={()=>moveToBulletin('notice')}>공지사항</MainMenuItem>
        <StyledHr default/>
        <MainMenuItem onClick={()=>moveToBulletin('popular')}>인기게시판</MainMenuItem>
        <StyledHr default/>
        <MainMenuItem onClick={()=>moveToBulletin('free')}>자유게시판</MainMenuItem>
        <StyledHr default/>
        <MainMenuItem onClick={()=>moveToBulletin('humor')}>유머게시판</MainMenuItem>
        <StyledHr default/>
        <MainMenuItem onClick={()=>moveToBulletin('info')}>정보게시판</MainMenuItem>
        <StyledHr default/>
      </MainMenuBar>
    </WrapperMainManu>
  );
}

export default MainMenu;