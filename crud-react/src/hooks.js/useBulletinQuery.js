import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useBulletinQuery = (title, content, ...rest) => {
  const queryClient = useQueryClient();

  // 생성, 삭제 후 해당 게시판 이동 메소드
  const navigate = useNavigate();
  const moveToBack = () => {
    navigate(-1, {replace: true});
  }

  // 게시글 create mutation
  const createBulletin = async (bulletin) => {
    await axios.post('/bulletin', bulletin);
  };

  const createMutation = useMutation (
    createBulletin, {
      onSuccess: () => {
        queryClient.invalidateQueries('bulletins');
        queryClient.invalidateQueries(['bulletins', 'entire']);
      }
    });
    
  const onCreate = () => {
    const [user_id, nickname, type] = rest;

    if(!title || !content) {
      alert("내용을 입력해주세요");
      return;
    }
    
    createMutation.mutate({title, content, user_id, nickname, type});

    moveToBack();
  };

  // 게시글 update mutation
  const updateBulletin = async (bulletin) => {
    await axios.put('/bulletin', bulletin);
  };

  const updateMutation = useMutation (
    updateBulletin, {
      onSuccess: () => {
        queryClient.invalidateQueries('bulletins');
        queryClient.invalidateQueries(['bulletins', 'entire']);
      }
    });

  const onUpdate = () => {
    const [params] = rest;

    updateMutation.mutate({id: params.id, title, content});
    window.location.reload(); //새로고침 하여 데이터 갱신 및 게시글 초기화면 전환
  };

  // 게시글 delete mutation
  // axios.delete는 데이터 요청을 body에 담지 않기에 params나 query로 보냄
  // 아래는 params이지만 서버에서 query로 받음
  const deleteBulletin = async (params_id) => {
    await axios.delete('/bulletin', {
      params: params_id
    });
  };

  const deleteMutation = useMutation (
    deleteBulletin, {
      onSuccess: () => {
        queryClient.invalidateQueries('bulletins');
        queryClient.invalidateQueries(['bulletins', 'entire']);
      }
    });

  const onDelete = () => {
    const [params] = rest;

    const isConfirm = window.confirm("정말로 삭제하시겠습니까?");

    if(isConfirm) {
      deleteMutation.mutate({id: params.id});
      moveToBack();
    }
  };

  return [onCreate, onUpdate, onDelete];
};

export default useBulletinQuery;