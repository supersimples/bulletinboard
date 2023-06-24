import styled, {css} from "styled-components";
import { lighten } from "polished";

const StyledBtn = styled.button`
  width: 50px;
  height: 30px;
  background-color: black;
  margin-right: 5px;
  color: white;
  border: black;
  border-radius: 3px;

  &:hover {
    background-color: ${lighten(0.3, 'black')};
    border: ${lighten(0.3, 'black')};
    cursor: pointer;
  }

  // 댓글 등록 버튼 in Comments.js
  ${props => props.comments && css`
    margin-left: 20px;
  `}
`;

export default StyledBtn;