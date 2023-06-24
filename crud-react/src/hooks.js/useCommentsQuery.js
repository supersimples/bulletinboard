import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

function useCommentsQuery(params, comment) {
  const queryClient = useQueryClient();
  
  // 댓글 추가 mutation
  const createComments = async (comments) => {
    await axios.post('/comments', comments);
  };
  
  const createMutation = useMutation(createComments, {
    onSuccess: () => {
      queryClient.invalidateQueries('comments');
      queryClient.invalidateQueries('commentsCount');
    }
  });
  
  const onCreate = (user_id, nickname, contents, ...rest) => {
    // 댓글 내용 없을 시 return
    if(!contents) {
      return;
    }

    // 부모 댓글의 id를 따로 인자로 받아 그것을 포함하여 답글 생성 mutate를 함
    if(rest.length > 0) {
      const [id ,onCancle] = rest;

      onCancle();
      
      createMutation.mutate({
        bulletin_id: params.id,
        user_id, 
        nickname, 
        content: contents,
        parent_comment: id
      });  

      return;
    }

    createMutation.mutate({
      bulletin_id: params.id, 
      user_id, 
      nickname, 
      content: contents
    });
  };

  // 댓글 수정 mutation
  const updateComments = async (comments) => {
    await axios.put('/comments', comments);
  };

  const updateMutation = useMutation(updateComments, {
    onSuccess: () => {
      queryClient.invalidateQueries('comments');
      queryClient.invalidateQueries('commentsCount');
    }
  });

  // 답글 수정 시에만 reply_id 받음
  const onUpdate = (contents, onCancle, reply_id=null) => {

    // 수정 모드 취소하고 그 전 상태로 돌아감
    onCancle();

    // 답글의 id값을 따로 인자로 받아 답글 수정 mutate를 함
    if(reply_id) {
      updateMutation.mutate({
        id: reply_id, 
        bulletin_id: params.id, 
        content: contents
      });

      return;
    }
    
    updateMutation.mutate({
      id: comment.id, 
      bulletin_id: params.id, 
      content: contents
    });
  };

  // 댓글 삭제 mutation
  // axios.delete는 데이터 요청을 body에 담지 않기에 params나 query로 보냄.
  const deleteComments = async (id) => {
    await axios.delete('/comments', {
      params: id
    });
  };

  const deleteMutation = useMutation(deleteComments, {
    onSuccess: () => {
      queryClient.invalidateQueries('comments');
      queryClient.invalidateQueries('commentsCount');
    }
  });

  // 인자에 (...rest) 만 넣을 시 event가 인자로 전달 받음 => 따로 default 설정한 reply_id 인자 설정
  // reply_id 인자를 선택적으로 받을 수 있음.
  const onDelete = (reply_id=null) => {

    // 답글의 id값을 따로 인자로 받아 답글 삭제 mutate를 함
    if(reply_id) {
      deleteMutation.mutate({id: reply_id, bulletin_id: params.id});

      return;
    }

    deleteMutation.mutate({id: comment.id, bulletin_id: params.id});
  };

  return [onCreate, onUpdate, onDelete];
}

export default useCommentsQuery;