import styled from "styled-components";
import { useState } from "react";

import useCommentsQuery from "../hooks.js/useCommentsQuery";
import useInput from "../hooks.js/useInput";

import { CommentsInputBox } from "./Comments";
import CreateReply from "./CreateReply";
import RepliesList from "./RepliesList";
import StyledHr from "../styledComponents.js/StyledHr";
import { useNavigate } from "react-router-dom";

const CommentsBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 600px;
  padding: 10px;
  margin-top: 10px;

  div { 
    padding-bottom: 5px;
  }

  .commentsInfo {
    width: 490px;
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

const UpdateCommentsBox = styled.div`
  width: 600px;
  padding: 10px;
  margin-top: 10px;
`;

export const CommentsModifyBtn = styled.span`
  width: 35px;
  height: 20px;
  cursor: pointer;
  font-size: 13px;
  margin: 0 5px 0 5px;

  &:hover {
    color: gray;
  }
`;

const ReplyBtn = styled.div`
  cursor: pointer;
  font-size: 13px;
  margin-top: 23px;
  &:hover {
    color: gray;
  }

  text-align: center;
  padding: 0 !important;
  margin: 30px auto 0;
`;

function CommentsList({comment, params, authInfo}) {
  const navigate = useNavigate();

  const {id: comment_id, user_id, nickname, content, time} = comment;
  const {isLoggedIn, loginUser_id} = authInfo;

  const [updateMode, setUpdateMode] = useState(); 
  const [createReplyMode, setCreateReplyMode] = useState();

  // 입력 값 state 최신화 
  const [input, setInput, onChange] = useInput();
  
  // 댓글 update, delete mutation
  const [onCreate, onUpdate, onDelete] = useCommentsQuery(params, comment);

  let replies;

  // 받아온 답글(배열)이 있을 시 할당
  if (comment.replies) {
    replies = comment.replies;
  }

  // 댓글 수정 mode
  const onUpdateMode = () => {
    setInput(content);
    setUpdateMode(true);
  };
  // 답글 추가 mode
  const onCreateReplyMode = () => {
    setCreateReplyMode(true);

    if(createReplyMode) {
      setCreateReplyMode(false);
    }
  };

  // 댓글수정 mode , 답글추가 mode 취소
  const onCancleUpdateMode = () => {
    setUpdateMode(false);
  };
  const onCancleReplyMode = () => {
    setCreateReplyMode(false);
  };

  // 게시글 작성자의 userpage로 이동
  const moveToUserPage = () => navigate(`/users/${nickname}`);

  return (<>
    {!updateMode ?  // updateMode아닐시 댓글 노출 / updateMode일시 댓글 수정 박스 노출 
      <CommentsBox>
        <div className="commentsInfo">
          <div onClick={moveToUserPage}>{nickname}</div>
          <div>{content}</div>
          <div className="time">{time}</div>
        </div>
        <div>
          {isLoggedIn && user_id === loginUser_id &&
            <>
              <CommentsModifyBtn onClick={onUpdateMode}>수정</CommentsModifyBtn>
              {/* onDelete에서 default=null인 reply_id를 인자로 갖고있어 그냥 onDelete가 아닌  */}
              {/* arrow function 형태로 완전한 null 인자 전달. 그냥 onDelete 할 시 [object Object] 전달됨  */}
              <CommentsModifyBtn onClick={()=>onDelete()}>삭제</CommentsModifyBtn>  
            </>
          } 
          {isLoggedIn && <ReplyBtn onClick={onCreateReplyMode}>답글 달기</ReplyBtn>}
        </div>
      </CommentsBox> :
      <UpdateCommentsBox>
        <div>{nickname}</div>
        <div>
          <CommentsInputBox onChange={event=>onChange(event)} value={input} required />
          <div>
            <CommentsModifyBtn 
              onClick={onCancleUpdateMode}>
              취소
            </CommentsModifyBtn>
            <CommentsModifyBtn 
              onClick={()=>onUpdate(input, onCancleUpdateMode)}>
              등록
            </CommentsModifyBtn>
          </div>
        </div>
      </UpdateCommentsBox>
    }
    {createReplyMode && //답글 추가 mode
      <CreateReply 
        id={comment_id} 
        onCreate={onCreate} 
        onCancle={onCancleReplyMode} 
        authInfo={authInfo}
      />
    }
    <StyledHr comments/>
    {replies &&
      replies.map(reply => (  //답글 배열 mapping
        (<RepliesList 
          key={reply.id}
          reply={reply}
          comment={comment}
          params={params}
          onUpdate={onUpdate}
          onDelete={onDelete} 
          authInfo={authInfo}
        />)
    ))}
  </>);
}

export default CommentsList;