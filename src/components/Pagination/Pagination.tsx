import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

type PaginationProps1 = {
  currentPage: number;
  onChangePage: (indx: number) => void;
};

const Pagination: React.FC<PaginationProps1> = ({
  currentPage,
  // setCurrentPage,
  onChangePage,
  // value,
}) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={currentPage - 1}
      //  renderOnZeroPageCount={null}
    />
  );
};
export default Pagination;
