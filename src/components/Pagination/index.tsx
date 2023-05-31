import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";

type PaginationProps = {
  currentPage: number;
  onChangePage: (page:number)=> void; // функция которая получает 1 аргумент с типом number и ничего не возвращает
};

const Pagination: React.FC<PaginationProps> = ({ onChangePage, currentPage }) => 
  <ReactPaginate
      className={styles.pagination}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4} // сколько товаров показывать на странице
      pageCount={3} // количество страниц
      forcePage={currentPage - 1} // текущая страница
    />;

export default Pagination;
