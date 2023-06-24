import axios from "axios";
import { useQuery } from "react-query";

import ContentsBox from "./ContentsBox";

function MainPage() {
  const fetchBulletins = async () => {
    const {data} = await axios.get('/bulletin');
    return data;
  };

  // 게시글 목록 fetch query
  const {data: bulletins} = useQuery(['bulletins', 'entire'], fetchBulletins, {
    initialData: []
  });
  
  const type = 'entire';

  return (
    <ContentsBox items={bulletins} bulletinType={type}/>
  );
}

export default MainPage;