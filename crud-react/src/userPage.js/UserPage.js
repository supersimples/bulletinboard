import axios from 'axios';
import styled, { css } from 'styled-components';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useState } from 'react';

import PaginateItems from "../components.js/paginate.js/PaginateItems";
import StyledBox from "../styledComponents.js/StyledBox";

const UserInfo = styled.div`
  width: 300px;
  text-align: center; 

  > div {
    padding-bottom: 80px; 
  }

  .nickname {
    padding-top: 40px;
    font-size: 28px;
  }

  .count {
    div {
      padding-bottom: 30px;
    }
  }

  .switchBtns {
    span {
      cursor: pointer;
      color: gray;
    }
    span:first-child {
      ${({whatBulletin}) => whatBulletin === 'bulletin' && css`
        color: black;
        text-decoration: underline;
      `}
    }
    span:last-child {
      ${({whatBulletin}) => whatBulletin === 'comments' && css`
        color: black;
        text-decoration: underline;
      `}
      margin-left: 30px;
    }
  }
`; 

function UserPage () {
  const params = useParams();
  const {nickname} = params;

  const [whatBulletin, setWhatBulletin] = useState('bulletin');

  const showBulletin = () => setWhatBulletin('bulletin');
  const showBulletinWithComments = () => setWhatBulletin('comments');

  const fetchUserBulletins = async () => {
    const {data} = await axios.get(`/bulletin/users/${nickname}`);
    return data;
  };

  // 게시글 목록 fetch query
  const {data: {userBulletin, userBulletinWithComments}} = useQuery(
    ['userInfo'], fetchUserBulletins, {
    initialData: {
      userBulletin: [],
      userBulletinWithComments: []
    },
    cacheTime: 0
  });

  return(
    <StyledBox userPage>
      <UserInfo whatBulletin={whatBulletin}>
        <div className='nickname'>{nickname}</div>
        <div className='count'>
          <div>
            <span>게시글 수</span>
            <span> {userBulletin.length}</span>
          </div>
          <div>
            <span>댓글단 글 수</span>
            <span> {userBulletinWithComments.length}</span>
          </div>
        </div>
        <div className='switchBtns'>
          <span onClick={showBulletin}>작성 글</span>
          <span onClick={showBulletinWithComments}>댓글단 글</span>
        </div>
      </UserInfo>
      <div className='separateLine'/>
      {whatBulletin === 'bulletin' &&
        <PaginateItems items={userBulletin}/>
      }
      {whatBulletin === 'comments' &&
        <PaginateItems items={userBulletinWithComments}/>
      }
    </StyledBox>
  );
}

export default UserPage;