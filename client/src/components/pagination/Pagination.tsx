import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";

type Props = {
  onChangePage: (pageNumber: number) => void | undefined;
  countPages: number;
};

const Pagination: React.FC<Props> = ({ onChangePage, countPages }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => onChangePage(e.selected + 1)}
      pageRangeDisplayed={2}
      pageCount={countPages}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
