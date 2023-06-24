import useInput from "../hooks.js/useInput";

import { CommentsInputBox } from "./Comments";
import { CommentsModifyBtn } from "./CommentsList";
import { EditReplyBox } from "./RepliesList";

function CreateReply({id, onCreate, onCancle, authInfo}) {
  const {loginUser_id, loginUser_nickname} = authInfo;

  const [input, , onChange] = useInput();

  return (
    <>
      <EditReplyBox>
        <div>{loginUser_nickname}</div>
        <CommentsInputBox onChange={event=>onChange(event)} value={input} required/>
        <div>
          <CommentsModifyBtn onClick={onCancle}>취소</CommentsModifyBtn>
          <CommentsModifyBtn 
            onClick={()=>onCreate(loginUser_id, loginUser_nickname, input, id, onCancle)}>
            등록
          </CommentsModifyBtn>
        </div>
      </EditReplyBox>
    </>
  );
}

export default CreateReply;