import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";

type Props = {
  onChangePage: (pageNumber: number) => void | undefined;
};

const Pagination: React.FC<Props> = ({ onChangePage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => onChangePage(e.selected + 1)}
      pageRangeDisplayed={3}
      pageCount={50}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
