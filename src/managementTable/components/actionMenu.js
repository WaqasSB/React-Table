import React from "react";
import { Paper, Popper } from "@material-ui/core";

import { ClickAwayListener, Grow } from "@material-ui/core";
import { layoutMenuStyles } from "./style";
import { useSelector } from "react-redux";

export const ActionMenu = ({
  anchorEl,
  close,
  isEdit,
  isEditInvoice,
  isView,
  isDelete,
  handleDelete,
  handleEdit,
  handleEditInvoice,
  handleView,
  selectedItem,
  tableFor,
  actionMenuName,
  isConfirmationDeleteDialogVisible,
  setIsConfirmationDeleteDialogVisible,
  setRowSelectedId,
}) => {
  const classes = layoutMenuStyles();
  const { role } = useSelector((state) => state.user);
  const deletedActionMenu = () => {
    if (tableFor == "school" || tableFor == "users") {
      if (!isConfirmationDeleteDialogVisible) {
        setIsConfirmationDeleteDialogVisible(true);
        close();
        setRowSelectedId(selectedItem.id);
      }
    } else {
      handleDelete(selectedItem.id);
      close();
    }
  };
  return (
    <Popper
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      role={undefined}
      transition
      disablePortal
      placement={"bottom-end"}
      className={classes.popper}
    >
      {({ TransitionProps }) => (
        <Grow {...TransitionProps}>
          <Paper className={classes.paper}>
            <ClickAwayListener onClickAway={close}>
              <div>
                {isView && tableFor !== "school" && (
                  <div
                    role="presentation"
                    onClick={() => {
                      if (tableFor === "invoices")
                        handleView(selectedItem.studentId);
                      else handleView(selectedItem.id);
                    }}
                    className={classes.menuOption}
                  >
                    {actionMenuName[0]}
                  </div>
                )}
                {isEdit && role == "superadmin" && (
                  <div
                    role="presentation"
                    onClick={() => {
                      handleEdit(selectedItem);
                      close();
                    }}
                    className={classes.menuOption}
                  >
                    {tableFor == "users" || tableFor == "school"
                      ? "Edit"
                      : actionMenuName[1]}
                  </div>
                )}
                {isEditInvoice &&
                  tableFor !== "users" &&
                  tableFor !== "school" &&
                  (role === "manager" || role === "superadmin") && (
                    <div
                      role="presentation"
                      onClick={() => {
                        handleEditInvoice(selectedItem);
                        close();
                      }}
                      className={classes.menuOption}
                    >
                      {actionMenuName[2]}
                    </div>
                  )}
                {isDelete && role === "superadmin" && (
                  <div
                    role="presentation"
                    onClick={() => {
                      deletedActionMenu();
                    }}
                    className={classes.menuOption}
                  >
                    {actionMenuName[3]}
                  </div>
                )}
              </div>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};
