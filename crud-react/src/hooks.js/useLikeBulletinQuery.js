import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { useQueryClient } from "react-query";

function useLikeBulletinQuery(isLoggedIn, loginUser_id, params) {
  const queryClient = useQueryClient();
  
  // 현재 유저가 해당 게시글 좋아요 했는지 확인
  const checkLiked = async () => { 
    const {data} = await axios.get(`/bulletin/likes/${params.id}`);
    return data;
  };
  
  const {data: isLiked} = useQuery(['isLiked'], checkLiked, {
    initialData: false,
    cacheTime: 0
  });
  
  // 좋아요 총 수 fetch
  const fetchLikeCount = async () => { 
    const {data} = await axios.get(`/bulletin/likes/${params.id}/count`);
    return data.count;
  };
  
  const {data: likesCount} = useQuery(
    ['likesCount'],
    fetchLikeCount, {
      initialData: 0,
      cacheTime: 0
    }
  );

  // 현재 유저 좋아요 설정
  const setLike = async (likeInfo) => {
    await axios.post(`/bulletin/likes`, likeInfo);
  };
  
  const {mutate: setLikeMutate} = useMutation (
    setLike, {
      onSuccess: () => {
        queryClient.invalidateQueries('likesCount');
        queryClient.invalidateQueries('isLiked');
      } 
    });
  
  // 현재 유저 좋아요 취소 
  const cancleLike = async (bulletin_id) => {
    await axios.delete(`/bulletin/likes`, {
      params: bulletin_id
    });
  };
  
  const {mutate: cancleLikeMutate} = useMutation (
    cancleLike, {
      onSuccess: () => {
        queryClient.invalidateQueries('likesCount');
        queryClient.invalidateQueries('isLiked');
      } 
    });

  // 좋아요 설정 및 취소
  const pressLike = () => {
    if(!isLoggedIn) {
      alert("로그인 후에 이용 가능합니다");
      return;
    };
  
    // 좋아요 상태에 따라 설정 또는 취소 mutate 실행
    if(!isLiked) setLikeMutate({user_id: loginUser_id, bulletin_id: params.id});
    else cancleLikeMutate({bulletin_id: params.id});
  };

  return [pressLike, isLiked, likesCount];
}

export default useLikeBulletinQuery;