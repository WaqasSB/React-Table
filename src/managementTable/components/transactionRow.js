import React from "react";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import TableCell from "@material-ui/core/TableCell";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { amountFormat } from "./util/constants";
import moment from "moment";
import "./footer.css";
export const TransactionRow = ({
  isItemSelected,
  selectionKey,
  handleClick,
  row,
  columns,
  openActionMenu,
  actionButtonClass,
  labelId,
}) => {
  return (
    <>
      {row["amount"] !== 0 ? (
        <TableRow
          hover
          style={{ padding: "3px 0px" }}
          role="checkbox"
          aria-checked={isItemSelected}
          tabIndex={-1}
          key={row.name}
          selected={isItemSelected}
        >
          <TableCell padding="checkbox">
            <Checkbox
              onClick={(event) => handleClick(event, row[selectionKey])}
              checked={isItemSelected}
              inputProps={{ "aria-labelledby": labelId }}
            />
          </TableCell>
          <TableCell align="left">{row["id"]}</TableCell>
          <TableCell align="left">{row["refNo"]}</TableCell>
          <TableCell
            align="left"
            style={{
              textTransform: "capitalize",
            }}
          >{`${row.student["firstName"]} ${row.student["lastName"]}`}</TableCell>

          <TableCell align="left">{amountFormat(row["amount"])}</TableCell>
          <TableCell align="left" style={{ color: "rgb(140, 140, 140)" }}>
            {moment(row["createdAt"]).format("MM/D/YY")}
          </TableCell>
          <TableCell align="center">
            <div
              role="presentation"
              onClick={(e) => {
                openActionMenu(e, row);
              }}
              className={actionButtonClass}
            >
              <MoreHorizIcon style={{ color: "gray" }} />
            </div>
          </TableCell>
        </TableRow>
      ) : (
        <></>
      )}
    </>
  );
};
