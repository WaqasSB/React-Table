import React from "react";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import TableCell from "@material-ui/core/TableCell";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  customTable: {
    "& .MuiTableCell-alignLeft": {
      padding: "0px 0px 0px 0px",
    },
  },
});

export const StudentRow = ({
  isItemSelected,
  selectionKey,
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
      selected={isItemSelected}
      classes={{ root: classes.customTable }}
    >
      <TableCell padding="checkbox">
        <Checkbox
          onClick={(event) => handleClick(event, row[selectionKey])}
          checked={isItemSelected}
          inputProps={{ "aria-labelledby": labelId }}
        />
      </TableCell>
      <TableCell align="left">{row["studentRegNo"]}</TableCell>
      <TableCell align="left" style={{ textTransform: "capitalize" }}>
        {`${row["firstName"]} ${row["lastName"]}`}
      </TableCell>
      <TableCell align="left">{row["grade"]}</TableCell>
      <TableCell align="left">{row["phoneNumber"]}</TableCell>
      {/* parentPhoneNumber stored in phoneNumber */}
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
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
    </TableRow>
  );
};
