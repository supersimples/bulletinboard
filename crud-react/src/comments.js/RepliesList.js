import styled from "styled-components";
import { useState } from "react";

import useInput from "../hooks.js/useInput";

import StyledHr from "../styledComponents.js/StyledHr";
import { CommentsModifyBtn } from "./CommentsList";
import { CommentsInputBox } from "./Comments";
import { useNavigate } from "react-router-dom";

export const RepliesBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 520px;
  padding: 10px;
  margin-top: 10px;
  text-align: left;
  margin-left: 80px;

  .commentsInfo { 
    width: 410px;
    margin-left: 20px;

    div{
      padding: 3px 0 3px;
    }

    div:first-child {
      cursor: pointer;
    }

    .time {
      font-size: 14px;
      color: gray;
    }
  }
`;

export const EditReplyBox = styled.div`
  width: 520px;
  padding: 10px;
  margin-top: 10px;
  margin-left: 90px;
`;

function RepliesList({reply, onUpdate, onDelete, authInfo}) {
  const navigate = useNavigate();

  const {id: reply_id, user_id, nickname, content, time} = reply;
  const {isLoggedIn, loginUser_id} = authInfo;
  
  const [updateMode, setUpdateMode] = useState(); 

  const [input, setInput, onChange] = useInput();

  const onUpdateMode = () => {
    setInput(content);
    setUpdateMode(true);
  };

  const onCancle = () => {
    setUpdateMode(false);
  };

  const moveToUserPage = () => navigate(`/users/${nickname}`);

  return (
    <>
      {!updateMode ? // updateMode 아닐시 기본답글 노출, updateMode 일시 답글 수정 박스 노출
        <>
          <RepliesBox>
            <div className="commentsInfo">
              <div onClick={moveToUserPage}>{nickname}</div>
              <div>{content}</div>
              <div className="time">{time}</div>
            </div>
            {isLoggedIn && user_id === loginUser_id &&
              <div>
                <CommentsModifyBtn onClick={onUpdateMode}>수정</CommentsModifyBtn>
                <CommentsModifyBtn onClick={()=>onDelete(reply_id)}>삭제</CommentsModifyBtn>
              </div>
            }
          </RepliesBox>
          <StyledHr comments/>
        </> :
        <>
          <EditReplyBox>
            <div>{nickname}</div>
            <CommentsInputBox onChange={event=>onChange(event)} value={input} required/>
            <div className="commentsModify">
              <CommentsModifyBtn 
                onClick={onCancle}>
                취소
              </CommentsModifyBtn>
              <CommentsModifyBtn 
                onClick={()=>onUpdate(input, onCancle, reply_id )}>
                등록
              </CommentsModifyBtn>
            </div>
          </EditReplyBox>
        </>
      }
    </>
  );
}

export default RepliesList;