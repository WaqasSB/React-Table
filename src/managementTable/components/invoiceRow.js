import React from "react";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import TableCell from "@material-ui/core/TableCell";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { makeStyles } from "@material-ui/core/styles";
import { amountFormat } from "./util/constants"
import moment from "moment";

const useStyles = makeStyles({
  customTable: {
    "& .MuiTableCell-alignLeft": {
      padding: "0px 0px 0px 0px",
    },
  },
});

export const InvoiceRow = ({
  selectionKey,
  isItemSelected,
  handleClick,
  row,
  columns,
  openActionMenu,
  actionButtonClass,
  labelId,
}) => {
  const classes = useStyles();
  return (
    <TableRow
      hover
      style={{ padding: "3px 0px" }}
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row.name}
      classes={{ root: classes.customTable }}
      selected={isItemSelected}
    >
      <TableCell padding="checkbox">
        <Checkbox
          onClick={(event) => handleClick(event, row[selectionKey])}
          checked={isItemSelected}
          inputProps={{ "aria-labelledby": labelId }}
        />
      </TableCell>
      <TableCell align="left">{row["invoiceId"]}</TableCell>
      <TableCell align="left">{row["studentId"]}</TableCell>
      <TableCell align="left" style={{ textTransform: "capitalize " }}>
        {row.student
          ? `${row.student.firstName} ${row.student.lastName}`
          : "Student Name"}
        {/* {row.student.firstName} {row.student.lastName} */}
      </TableCell>
      <TableCell align="left">{amountFormat(row["amount"])}</TableCell>
      <TableCell align="left" style={{ color: "rgb(140, 140, 140)" }}>
        {moment(row["dueDate"]).format("DD/MM/YYYY")}
      </TableCell>
      <TableCell align="left">
        <div
          style={{
            height: 30,
            width: 70,
            borderRadius: 10,
            textTransform: "capitalize",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            backgroundColor: row.status === "pending" ? "#ffeae1" : "#ebff9e",
            color: row.status === "pending" ? "#ff834b" : "#95b420",
          }}
        >
          {row["status"]}
        </div>
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
  );
};
