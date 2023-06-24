import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Tr = styled.tr`
  cursor: pointer;
  &:hover {
    background-color: rgba(128,128,128,0.1);
  }

  td {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  td:nth-of-type(3) {
    max-width:375px;
  }
`;

function ContentsItem({item}) {
  const navigate = useNavigate();

  // 메인화면에서 게시글 클릭 시 이동
  const moveToBulletin = () => {
    navigate(`/bulletin/${item.type}/${item.id}`);
  };

  const bulletinTypes = {
    notice: '공지사항',
    popular: '인기게시판',
    free: '자유게시판',
    humor: '인기게시판',
    info: '정보게시판'
  };

  const bulletinType = bulletinTypes[item.type];

  return (
    <>
      <Tr onClick={()=>moveToBulletin()}>
        <td>{item.id}</td>
        <td>{bulletinType}</td>
        <td>{item.title}</td>
        <td>{item.nickname}</td>
        <td>{item.time}</td>
      </Tr>
    </>
  );
}

export default ContentsItem;