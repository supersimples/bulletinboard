import axios from "axios";
import { useQuery } from "react-query";
import { useParams, Navigate } from "react-router-dom";

import ContentsBox from "../components.js/ContentsBox";

function BulletinContainer() {
  const params = useParams();
  const {type} = params;

  const bulletinTypes = ['notice', 'popular', 'free', 'humor', 'info'];
  const hasType = bulletinTypes.includes(type);

  const fetchBulletins = async () => {
    const {data} = await axios.get(`/bulletin/${type}`);
    return data;
  };

  // 게시글 목록 fetch query
  const {data: bulletins} = useQuery(['bulletins', type], fetchBulletins, {
    initialData: [],
    cacheTime: 0
  });

  // 임의로 다른 게시판 접속 시도시 notfound 페이지 이동
  if(!hasType) return <Navigate to="/NotFound" replace={true} />;

  return (
    <ContentsBox items={bulletins} bulletinType={type}/>
  );
}

export default BulletinContainer;