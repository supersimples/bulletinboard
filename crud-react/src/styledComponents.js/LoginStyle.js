import styled from "styled-components";
import { lighten } from "polished";

const Background = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #EEEEEE;
  display: flex;
  justify-content: center;
  align-itmms: center;
`;

const RegisterBox = styled.div`
  width: 600px;
  height: 650px;
  margin: auto;
  border: 1px solid white;
  border-radius: 3%;
  background-color: white;
`;

const RegisterTitle = styled.div`
  position: relative;
  margin: 30px auto;
  font-size: 30px;
  font-family: 'Signika', sans-serif;
  text-align: center;
  .closeBtn {
    position: absolute;
    cursor: pointer;
    color: silver;
    right: 13px;
    top: -17px;
  }
  .closeBtn:hover {
    color: black;
  }
`;

const StyledForm = styled.form`
  width: 600px;
  text-align: center;
  input {
    margin: 5px auto 5px;
    border: 1px solid gray;
    border-radius: 3px;
    width: 350px;
    height: 40px;
  }
`;

const LoginBtn = styled.button`
  width: 150px;
  height: 35px;
  background-color: black;
  color: white;
  border: black;
  border-radius: 3px;
  margin-top: 10px;

  &:hover {
    background-color: ${lighten(0.3, 'black')};
    border: ${lighten(0.3, 'black')};
    cursor: pointer;
  }
`;

const FailedMsgBox = styled.div`
  height: 15px;
  margin-bottom: 15px;
`; 

const FailedMsg = styled.div`
  color: red;
  font-size: 13px;
`;

export { Background, RegisterBox, RegisterTitle, StyledForm, LoginBtn, FailedMsgBox, FailedMsg };