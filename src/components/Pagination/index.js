import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";

const Pagination = ({ onChangePage, currentPage }) => {
  return (
    <ReactPaginate
      className={styles.pagination}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4} // сколько товаров показывать на странице
      pageCount={3} // количество страниц
      forcePage={currentPage - 1} // текущая страница
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
