import axios from "axios";
import styled, {css} from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useState } from "react";
import { FaHeart } from 'react-icons/fa';

import { useAuthContext } from "../AuthContext";
import useBulletinQuery from "../hooks.js/useBulletinQuery";
import useLikeBulletinQuery from "../hooks.js/useLikeBulletinQuery";

import Comments from "../comments.js/Comments";
import { InputBox } from "./CreateBulletin";
import StyledBtn from "../styledComponents.js/StyledBtn";
import StyledHr from "../styledComponents.js/StyledHr";
import StyledBox from "../styledComponents.js/StyledBox";

const ShowBox = styled.div`
  width: 700px;
  margin: 0 auto;

  text-align: left;

  .titleSection {
    display: flex;
    justify-content: space-between;
    align-items: end;

    padding: 30px 40px 30px;
    border-top: 2px solid gray;
    border-bottom: 1px solid gray;
    
    .title {
      width: 500px;
      word-wrap: break-word;

      p {
        padding-bottom: 12px;
      }
      span {
        padding-right: 8px;
        font-size: 14px;
      }
      span:first-child {
        cursor: pointer;
      }
      span:last-child {
        color: gray;
      }
    }

    .modifyBulletin {
      display: flex;
      cursor: pointer;
      
      div {
        margin-right: 7px;
        font-size: 14px;
      }

      > div:hover {
        color: gray;
      }
    }
  }

  .contentsSection {
    position: relative;
    width: 620px;
    word-wrap: break-word;
    padding: 30px 40px 60px;

    img {
      max-width: 620px;
      text-align: left;
      padding-bottom: 10px;
    }
    video {
      width: 620px;
      padding-bottom: 10px;
    }
  }
`;

const LikeBtn = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 60px;
  height: 24px;
  bottom: 10px;
  right: 40px;

  .icon {
    color: gray;
    font-size: 20px;
    margin-left: 4px;
    vertical-align: middle;

    ${({isLiked}) => isLiked && css`
      color: black;
    `}
  }
  .icon:hover {
    color: black;
    cursor: pointer;
  }
  
  .likesCount {
    margin-left: 4px;
  }
`;

function ReadBulletin() {
  const navigate = useNavigate();

  const params = useParams();
  const {type} = params;

  const {isLoggedIn, loginUser_id} = useAuthContext();
  
  const [updateMode, setUpdateMode] = useState(false);

  // 수정시 onChange에 이용하기 위한 상태 값
  const [bulletinState, setBulletinState] = useState({
    title: '',
    content: ''
  });
  const {title, content} = bulletinState;

  // 수정, 삭제 버튼 클릭 시 수정화면 전환
  const onUpdateMode = () => {
    setUpdateMode(true);
  };

  // 초기화면 전환
  const onCancle = () => {
    setUpdateMode(false);
  };

  // 게시글 작성자의 userpage로 이동
  const moveToUserPage = () => navigate(`/users/${bulletin.nickname}`);

  // 해당 게시글 fetch
  const fetchBulletin = async () => { 
    const {data} = await axios.get(`/bulletin/${type}/${params.id}`);
    return data;
  };
  
  const {data: bulletin} = useQuery(
    ['bulletin'],
    fetchBulletin, {
    // data를 메모리에서 바로 삭제하여, 다른 게시글 방문시 이전 게시글의 cache data가 표시되지 않도록함
    cacheTime: 0,
    //data fetch 이전 undefined일때 렌더링할 컴포넌트 이전에 return null을 해줘야 오류없는데 
    //이럴 시에 댓글 컴포넌트 렌더가 더 늦어져서 data 초기값 설정
    initialData: { 
      title: '',
      content: '',
      user_id: '',
      nickname: '',
      time: ''
    },
    onSuccess: () => {
      console.log(bulletin);
      setBulletinState({
        title: bulletin.title,
        content: bulletin.content
      });
    }
  });

  // 수정 모드에서의 게시글 제목,내용 onChange 기능
  const onChange = event => {
    const {name, value} = event.target;

    setBulletinState({
      ...bulletinState,
      [name]: value
    });
  };
  
  // 게시글 수정, 삭제 mutation
  const [, onUpdate, onDelete] = useBulletinQuery(title, content, params); 

  // 좋아요 설정 및 취소 mutation, 좋아요 수와 현재 유저가 좋아요 눌렀는지 상태 fetch
  const [pressLike, isLikeBtnPressed, userLikesCount] = useLikeBulletinQuery(
    isLoggedIn, loginUser_id, params
  );

  return (
    <StyledBox>
      {!updateMode ? // 초기화면 노출, updateMode 전환 시 수정화면 노출
        <ShowBox>
          <div className="titleSection">
            <div className="title"> 
              <p>{bulletin.title}</p>
              <div>
                <span onClick={moveToUserPage}>{bulletin.nickname}</span> 
                <span>{bulletin.time}</span>
              </div>
            </div>
            {/* login상태 | 게시글유저=로그인유저 일 시 수정,삭제 기능 노출 */}
            {isLoggedIn && bulletin.user_id === loginUser_id &&
              <div className="modifyBulletin">
                <div onClick={onUpdateMode}>수정</div>
                <div onClick={onUpdateMode}>삭제</div>
              </div>
            }
          </div>
          <div className="contentsSection">
            <p>{bulletin.content}</p> 
            <LikeBtn isLiked={isLikeBtnPressed} onClick={pressLike}>
              <div className="iconBox">
                <FaHeart className="icon"/>
              </div>
              <div className="likesCount">{userLikesCount}</div>
            </LikeBtn>
          </div>
        </ShowBox> :
        <InputBox>
          <div>
            <div>
              <input 
                value={title || bulletin.title} name='title' 
                onChange={event=>onChange(event)} 
                maxLength={100} required>
              </input>
            </div>
            <div className="contentsWrapper">
              <textarea 
                value={content || bulletin.content} name='content' 
                onChange={event=>onChange(event)} 
                maxLength={32767} required>
              </textarea>
            </div>
            <div className="btn">
              <StyledBtn onClick={onUpdate}>수정</StyledBtn>
              <StyledBtn onClick={onDelete}>삭제</StyledBtn>
              <StyledBtn onClick={onCancle}>취소</StyledBtn>
            </div>
          </div>
        </InputBox>
      }
      <StyledHr readBulletin/>
      <Comments params={params}/> 
    </StyledBox>
  );
}

export default ReadBulletin;