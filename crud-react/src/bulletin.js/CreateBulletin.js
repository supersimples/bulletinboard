import styled from "styled-components"
import { useNavigate, Navigate, useParams } from "react-router-dom";
import { useState } from "react";

import useBulletinQuery from "../hooks.js/useBulletinQuery";
import { useAuthContext } from "../AuthContext";

import StyledBox from "../styledComponents.js/StyledBox";
import StyledBtn from "../styledComponents.js/StyledBtn";

export const InputBox = styled.div`
  width: 700px;
  margin: 0 auto;
  position: relative;
  text-align: center;
  
  input {
    width: 605px;
    height: 30px;
    margin-bottom: 40px;
    outline: none;
    padding: 5px;
    font-size:14px;
  }

  .contentsWrapper {
    width: 618px;
    max-height: 600px;
    overflow-y: scroll;
    overflow-x: hidden;
    border: 1px solid black;
    margin: 0 auto;
    text-align: left;

    .uploadFile {
      position: absolute;
      top: 90px;
      right: -10px;

      div {
        width: 45px;
        height: 45px;
        text-align: center;
        font-size: 27px;
        
        svg {
          cursor: pointer;
        }

      }
    }

    img {
      max-width: 584px;
      padding: 10px;
      display: block;
    }

    video {
      width: 584px;
      padding: 10px;
    }
  }

  textarea {
    width: 598px;
    height: 410px;
    resize: none;
    outline: none;
    padding: 10px;
    font-size:14px;
    border: none;
  }

  .btn {
    display: flex;
    justify-content: right;
    margin: 50px;
  }
`;

function CreateBulletin() {
  const navigate = useNavigate();

  const params = useParams();
  const {type} = params;

  const {isLoggedIn, loginUser_id, loginUser_nickname} = useAuthContext();

  const onCancle = () => {
    navigate(-1);
  };

  // 수정시 onChange에 이용하기 위한 상태 값
  const [bulletinState, setBulletinState] = useState({
    title: '',
    content: ''
  });
  const {title, content} = bulletinState;

  const onChange = event => {
    const {name, value} = event.target;

    setBulletinState({
      ...bulletinState,
      [name]: value
    });
  };

  // 게시글 생성 mutation
  const [onCreate] = useBulletinQuery(title, content, loginUser_id, loginUser_nickname, type);

  // hook은 early return 뒤에 쓰면 안되므로 early return 불가능
  // login 상태 아닐 시 login page로 이동 (login 일때만 글쓰기 가능)
  if(!isLoggedIn) {
    alert(`글 쓰기는 로그인 후에만 할 수 있습니다`);
    return <Navigate to="/login" replace={true} />; // /login이동한거 기록 안남음
  }
  return(
    <StyledBox>
      <InputBox>
        <div>
          <div>
            <input
              placeholder="제목 입력" name='title' value={title} 
              onChange={(event)=>onChange(event)} maxLength={100} required>
            </input>
          </div>
          <div className="contentsWrapper">
            <textarea 
              className="textareas"
              placeholder="내용 입력" name='content' value={content} 
              onChange={(event)=>onChange(event)} maxLength={32767} required>
            </textarea>
          </div>
          <div className="btn">
            <StyledBtn onClick={onCancle}>취소</StyledBtn>
            <StyledBtn onClick={onCreate}>등록</StyledBtn>
          </div>
        </div>
      </InputBox>
    </StyledBox>
  );
}

export default CreateBulletin;