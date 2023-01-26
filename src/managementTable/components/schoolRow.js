import React from "react";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import TableCell from "@material-ui/core/TableCell";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

export const SchoolRow = ({
  isItemSelected,
  selectionKey,
  handleClick,
  row,
  columns,
  openActionMenu,
  actionButtonClass,
  labelId,
  tableFor,
}) => {
  return (
    <TableRow
      className={"school_row"}
      hover
      style={{ padding: "3px 0px" }}
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row.name}
      selected={isItemSelected}
    >
      {/* <TableCell padding="checkbox">
        <Checkbox
          onClick={(event) => handleClick(event, row[selectionKey])}
          checked={isItemSelected}
          inputProps={{ "aria-labelledby": labelId }}
        />
      </TableCell> */}
      {columns.map(({ id }) =>
        id === "actions" ? (
          <TableCell key={id} align="center">
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
        ) : (
          <TableCell key={id} align="left">
            {row[id]}
          </TableCell>
        )
      )}
    </TableRow>
  );
};
