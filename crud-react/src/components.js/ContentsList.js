import React from "react";
import styled from "styled-components";

import ContentsItem from "./ContentsItem";

const Table = styled.table`
  width: 100%;
  border-top: 1px solid black;
  border-collapse: collapse;
  text-align: center;
  font-size: 15px;

  tr {
    border-bottom: 1px solid black;
    padding: 10px;
  }
  th, td {
    padding: 10px 0 10px 0;
  }

  thead {
    th:nth-of-type(1) {
      width: 70px;
    }
    th:nth-of-type(2) {
      width: 110px;
    }
    th:nth-of-type(3) {
      width: 375px;
    }
    th:nth-of-type(4) {
      width: 188px;
    }
    th:nth-of-type(5) {
      width: 150px;
    }
  }
`;

function ContentsList({ currentItems }) {

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>번호</th>
            <th>게시판</th>
            <th>제목</th>
            <th>글쓴이</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {currentItems && currentItems.map(item => (
              <ContentsItem 
                key={item.id}
                item={item}>
              </ContentsItem>
            )
          )}
        </tbody>
      </Table>
    </>
  );
}

export default ContentsList;