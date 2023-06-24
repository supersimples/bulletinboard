import styled, {css} from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { lighten } from "polished";
import { useEffect, useState } from "react";

import MainMenu from "./MainMenu";
import PaginateItems from "./paginate.js/PaginateItems";
import StyledBox from "../styledComponents.js/StyledBox";
import { useAuthContext } from "../AuthContext";

const BulletinType = styled.div`
  text-align: center;
  font-size: 25px;
  padding-bottom: 30px;
  font-family: 'Signika', sans-serif;
  font-size: 30px;
`;

const CreateContentsBtn = styled.div`
  position: absolute;
  bottom: -60px;
  left: 80%;

  button {
    width: 80px;
    height: 30px;
    background-color: black;
    color: white;
    border: black;
    border-radius: 3px;

    ${({bulletinType}) => bulletinType === 'entire' && css`
      display: none;
    `}

    &:hover {
      background-color: ${lighten(0.3, 'black')};
      border: ${lighten(0.3, 'black')};
      cursor: pointer;
    }
  }
`;

const StyledFooter = styled.footer`
  width: 100%;
  height: 150px;
  bottom: 0;
  margin-top: 200px;
`;

function ContentsBox({items, bulletinType}) {
  const navigate = useNavigate();

  const {loginUser_id} = useAuthContext();

  const params = useParams();
  const {type} = params;

  const bulletiName = `${bulletinType} bulletin board`;

  const onCreate = (event) => {
    event.preventDefault();
    navigate(`/bulletin/${type}/create`);
  };

  const [displayMenu, setDisplayMenu] = useState();
  const [hideMenu, setHideMenu] = useState();
  // menu가 display될 시 기존 StyledBox 컴포넌트의 position을 relative -> fixed로 바꿔 스크롤바 없앰 
  const [removeScroll, setRemoveScroll] = useState('relative');

  // MenuBtn 클릭 시 menu display 핸들링
  const handleDisplayMenu = () => {
    // hide -> display
    if(!displayMenu) {
      setTimeout(()=> setRemoveScroll('fixed'), 700);
    }
    setDisplayMenu(true);

    // display -> hide
    if(displayMenu) {
      setRemoveScroll('relative');
      setHideMenu(true);

    // menu hide 후 상태변환
      setTimeout(() => {
        setDisplayMenu(false);
        setHideMenu(false);
      }, 1000);
    }
  };

  // 게시판 종류 바꼈을 시 MainMenu 컴포넌트 초기상태로 만듦
  useEffect(()=> {
    setRemoveScroll('relative');
    setDisplayMenu(false);
    setHideMenu(false);
  }, [bulletinType])

  return (
    <>
      <MainMenu displayMenu={displayMenu} hideMenu={hideMenu} onClick={handleDisplayMenu} />
      <StyledBox removeScroll={removeScroll}>
        <BulletinType>{bulletiName}</BulletinType>
        <PaginateItems items={items}/>
        {/* 공지사항 게시판은 admin만 글쓰기 가능 */}
        {!(bulletinType === 'notice' && loginUser_id !== 'admin') &&
          <CreateContentsBtn bulletinType={bulletinType}>
            <button onClick={onCreate}>글 쓰기</button>
          </CreateContentsBtn>
        }
      </StyledBox>
      <StyledFooter />
    </>
  );
}

export default ContentsBox;