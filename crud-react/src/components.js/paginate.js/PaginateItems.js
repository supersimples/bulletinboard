import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import "./paginateStyle.css";

import ContentsList from '../ContentsList';

// 게시글 목록에 띄울 데이터 items 받음
function PaginateItems({ itemsPerPage, items }) {
  // 게시글 데이터 중 현재 페이지의 데이터
  const [currentItems, setCurrentItems] = useState(null);
  // 총 페이지 수
  const [pageCount, setPageCount] = useState(0);
  // 페이지에 띄울 게시글 시작 및 끝 인덱스
  const [itemOffset, setItemOffset] = useState(0);

  // 페이지 변경 시 데이터 변경
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [items, itemOffset, itemsPerPage]);

  // 다른 페이지 클릭 시 offset 변경
  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage % items.length;
    setItemOffset(newOffset);
  };

  if(!items) return null;
  return (
    <div>
      <ContentsList currentItems={currentItems} />
      <ReactPaginate
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        marginPagesDisplayed={0}
        pageCount={pageCount}
        previousLabel="<"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel=""
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </div>
  );
}

PaginateItems.defaultProps = {
  itemsPerPage: 10
}

export default PaginateItems;
