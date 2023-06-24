import styled, {css} from "styled-components";

const defaultStyle = css`
  width: 70%;
  margin: 10px auto 0;
`;

const headerStyle = css`
  width: 100%;
  border-right: 0;
  border-left: 0;
  border-bottom: 0;
  border-color: #ffffff;
`;

const commentsStyle = css`
  width: 100%;
  margin: 5px;
`;

const loginPageStyle = css`
  width: 70%;
  size: 1;
  margin: 15px auto;
`;

const readBulletinStyle = css`
  width: 70%;
  margin: 40px auto;
  margin-top: 10px;
`;

const StyledHr = styled.hr`
  ${props => props.default && defaultStyle}

  ${props => props.header && headerStyle}

  ${props => props.comments && commentsStyle}
  
  ${props => props.loginPage && loginPageStyle}
  
  ${props => props.readBulletin && readBulletinStyle}
`;

export default StyledHr;