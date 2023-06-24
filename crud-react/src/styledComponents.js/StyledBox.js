import styled, {css} from "styled-components";

const StyledBox = styled.div`
  width: 900px;
  margin: 0 auto;
  padding-top: 100px;

  // in ContentsBox.js
  ${props => props.removeScroll && css`
    position: ${props.removeScroll}
  `}

  ${props => props.userPage && css`
    display: flex;
    width: 100%;
    justify-content: space-around;

    .separateLine {
      width: 1px;
      height: 500px;
      border-right: 1px solid gray;
    }
  `}
`;

export default StyledBox;