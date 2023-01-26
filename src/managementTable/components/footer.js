// import React, { useEffect, useState } from "react";
// import { PrimaryButton } from "../../../styles/colors";
import ReactPaginate from "react-paginate";
import "./footer.css";
export const Footer = ({ total, handlePage, page }) => {
  const handlePageClick = (data) => handlePage(data.selected);

  return (
    <div className="table-footer">
      <ReactPaginate
        forcePage={page}
        previousLabel={"Prev"}
        nextLabel={"Next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={Math.ceil(total / 10)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
        previousClassName="previous-button"
        nextLinkClassName="next-button"
        pageLinkClassName={"page-link"}
        // activeClassName="active-link"
        activeLinkClassName="active-page-link"
      />
    </div>
  );
};
