import styled from "styled-components";
import axios from "axios";
import { useQuery } from "react-query";

import { useAuthContext } from "../AuthContext";
import useCommentsQuery from "../hooks.js/useCommentsQuery";
import useInput from "../hooks.js/useInput";

import StyledBtn from "../styledComponents.js/StyledBtn";
import CommentsList from "./CommentsList";

const CommentsSection = styled.div`
  width: 600px;
  margin: 0 auto 200px;

  .comment {
    margin-bottom: 30px;
  }

  form {
    margin-top: 40px;
  }
`;

export const CommentsInputBox = styled.textarea`
  width: 450px;
  height: 80px;
  padding: 10px;
  margin: 30px 0 0 0;
  resize: none;
`;

function Comments({params}) {
  const authInfo = useAuthContext();

  const {isLoggedIn, loginUser_id, loginUser_nickname} = authInfo;

  const [input, setInput , onChange] = useInput();

  // 댓글 추가 mutation
  const [onCreate] = useCommentsQuery(params);

  const onCreateComment = (loginUser_id, loginUser_nickname, input) => {
    onCreate(loginUser_id, loginUser_nickname, input);
    setInput('');
  };

  const wordsInPlaceholder = isLoggedIn ? "댓글 입력" : "로그인 후에 댓글을 달 수 있습니다";

  // 댓글 fetch
  const fetchComments = async () => { 
    const {data} = await axios.get(`/comments/${params.id}`);
    return data;
  };

  const {data: comments} = useQuery(['comments'], fetchComments, {
    cacheTime: 0 //다른 게시글 들어갈 시 이전 게시글 정보가 잠시 뜨는 것 방지 위해 0으로 지정
  });

  // 댓글 총 수 fetch
  const fetchCommentsCount = async () => { 
    const {data} = await axios.get(`/comments/${params.id}/count`);
    return data.count;
  };

  const {data: commentsCount} = useQuery(['commentsCount'], fetchCommentsCount, {
    initialData: 0,
    cacheTime: 0
  });

  return (
    (<CommentsSection>
      <div className="comment">
        <span>댓글 </span>
        <span> ({commentsCount})</span>
      </div>
      {comments && comments.map(comment => (   //댓글 배열 mapping
        (<CommentsList
          key={comment.id}
          comment={comment}
          params={params} 
          authInfo={authInfo}
        />)  
      ))}
      <CommentsInputBox 
        placeholder={wordsInPlaceholder}
        onChange={onChange} 
        value={input} 
        disabled={isLoggedIn ? false : true}
        required 
      />
      <StyledBtn comments onClick={()=>onCreateComment(loginUser_id, loginUser_nickname, input)}>등록</StyledBtn>
    </CommentsSection>)
  );
}

export default Comments;