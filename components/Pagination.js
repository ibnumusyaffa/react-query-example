import React from "react";
import PropTypes from "prop-types";
import clx from "clsx";

function PaginationItem({ children, active, onClick }) {
  let className = clx(
    "relative block py-2 px-3 leading-tight border  border-r-0 cursor-pointer",
    {
      "bg-sky-500 text-white border-blue-300": active,
      "text-gray-700 hover:bg-sky-50 border-gray-200": !active,
    }
  );
  return (
    <li className={className} onClick={onClick}>
      <a>{children}</a>
    </li>
  );
}

PaginationItem.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  onClick: PropTypes.func,
};

function Pagination({
  totalItems = 0,
  currentPage = 1,
  pageSize,
  onChangePage,
}) {
  function getPager(totalItems, currentPage, pageSize) {
    // default to first page
    currentPage = currentPage || 1;

    // default page size is 10
    pageSize = pageSize || 10;

    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);

    let startPage, endPage;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = [...Array(endPage + 1 - startPage).keys()].map(
      (i) => startPage + i
    );

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages,
    };
  }
  let pager = getPager(totalItems, currentPage, pageSize);
  return (
    <div className="flex justify-between items-center text-sm">
      <div>
        <ul className="flex pl-0 list-none rounded my-2">
          <li
            onClick={() =>
              pager.currentPage == 1
                ? null
                : onChangePage(pager.currentPage - 1)
            }
            className="relative  block py-2 px-3 leading-tight bg-white border border-gray-200 text-gray-700 border-r-0 ml-0 rounded-l hover:bg-sky-50"
          >
            <a className="cursor-pointer">
              Sebelumnya
            </a>
          </li>

          {pager.pages.map((page, index) => (
            <PaginationItem
              key={index}
              active={pager.currentPage === page}
              onClick={() => onChangePage(page)}
            >
              {page}
            </PaginationItem>
          ))}

          <li
            onClick={() =>
              pager.endPage == pager.currentPage
                ? null
                : onChangePage(pager.currentPage + 1)
            }
            className="relative block py-2 px-3 leading-tight bg-white border border-gray-200 text-gray-700 rounded-r hover:bg-sky-50"
          >
            <a className="cursor-pointer">
              Selanjutnya
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
  onChangePage: PropTypes.func,
  pageSize: PropTypes.number,
  totalItems: PropTypes.number,
};

export default Pagination;
