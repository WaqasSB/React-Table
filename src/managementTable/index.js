import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import { useStyles, useToolbarStyles } from "./styles";
import { ActionMenu } from "./components/actionMenu";
import { SchoolRow } from "./components/schoolRow";
import { InvoiceRow } from "./components/invoiceRow";
import { Footer } from "./components/footer";
import { UserRow } from "./components/userRow";
import { StudentRow } from "./components/studentRow";
import { TransactionRow } from "./components/transactionRow";
// import { UserDetail } from "../../pages/userDetail";

const editExcluded = ["transactions"];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const EnhancedTableHead = (props) => {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  // console.log(props.columns[5].id);
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {props.columns[1].id !== "merchantId" ? (
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ "aria-label": "select all desserts" }}
            />
          </TableCell>
        ) : (
          <></>
        )}
        {props.columns.map((headCell) => (
          <TableCell
            style={{ color: "black" }}
            key={headCell.id}
            align={
              headCell.numeric
                ? "right"
                : props.columns[1].id === "merchantId"
                ? "center"
                : "left"
            }
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export const ManagementTable = ({
  columns,
  data,
  tableFor = "school",
  handlePage = null,
  totalCount = null,
  pageNumber = null,
  selectionKey = "id",
  handleSelection = () => {},
  deleteItem = () => {},
  editItem = () => {},
  editInvoice = () => {},
  viewItem = () => {},
  preConfirmationDeleteCallback,
  isConfirmationDeleteDialogVisible,
  isConfirmButtonClicked,
  setIsConfirmationDeleteDialogVisible,
  setRowSelectedId,
}) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  // const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedItem, setSelectedItem] = useState(null);

  const [rows, setRows] = useState([]);

  const [actionMenuAnchor, setActionMenuAnchor] = useState(null);

  const closeActionMenu = () => setActionMenuAnchor(null);

  const openActionMenu = (e, id) => {
    setActionMenuAnchor(e.currentTarget);
    if (id) setSelectedItem(id);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  useEffect(() => {
    if (pageNumber && pageNumber !== page) setPage(pageNumber);
  }, [pageNumber]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n[selectionKey]);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  useEffect(() => {
    handleSelection(selected);
  }, [selected]);

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (newPage) => {
    if (handlePage) handlePage(newPage);
    setPage(newPage);
  };
  console.log(handlePage);
  const isSelected = (name) => selected.indexOf(name) !== -1;
  const emptyRows =
    rowsPerPage -
    Math.min(
      rowsPerPage,
      totalCount
        ? totalCount - page * rowsPerPage
        : data.length - page * rowsPerPage
    );

  useEffect(() => {
    if (handlePage) {
      setRows(data);
    } else {
      setRows(
        stableSort(data, getComparator(order, orderBy)).slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage
        )
      );
    }
  }, [data, handlePage, page, rowsPerPage]);
  console.log(totalCount);

  return (
    <div className={classes.root}>
      <TableContainer style={{ flex: 1 }}>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          size={"medium"}
          aria-label="enhanced table"
        >
          <EnhancedTableHead
            columns={columns}
            classes={classes}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
          />
          <TableBody>
            {rows.map((row, index) => {
              const isItemSelected = isSelected(row[selectionKey]);
              const labelId = `enhanced-table-checkbox-${index}`;

              if (tableFor === "school")
                return (
                  <SchoolRow
                    selectionKey={selectionKey}
                    isItemSelected={isItemSelected}
                    handleClick={handleClick}
                    row={row}
                    columns={columns}
                    openActionMenu={openActionMenu}
                    actionButtonClass={classes.actionButton}
                    labelId={labelId}
                    tableFor={tableFor}
                  />
                );
              else if (tableFor === "invoices")
                return (
                  <InvoiceRow
                    isItemSelected={isItemSelected}
                    selectionKey={selectionKey}
                    handleClick={handleClick}
                    row={row}
                    columns={columns}
                    openActionMenu={openActionMenu}
                    actionButtonClass={classes.actionButton}
                    labelId={labelId}
                  />
                );
              else if (tableFor === "users")
                return (
                  <UserRow
                    isItemSelected={isItemSelected}
                    handleClick={handleClick}
                    row={row}
                    columns={columns}
                    openActionMenu={openActionMenu}
                    actionButtonClass={classes.actionButton}
                    labelId={labelId}
                    selectionKey={selectionKey}
                  />
                );
              else if (tableFor === "students")
                return (
                  <StudentRow
                    selectionKey={selectionKey}
                    isItemSelected={isItemSelected}
                    handleClick={handleClick}
                    row={row}
                    columns={columns}
                    openActionMenu={openActionMenu}
                    actionButtonClass={classes.actionButton}
                    labelId={labelId}
                  />
                );
              else if (tableFor === "transactions")
                return (
                  <TransactionRow
                    selectionKey={selectionKey}
                    isItemSelected={isItemSelected}
                    handleClick={handleClick}
                    row={row}
                    columns={columns}
                    openActionMenu={openActionMenu}
                    actionButtonClass={classes.actionButton}
                    labelId={labelId}
                  />
                );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Footer
        handlePage={handleChangePage}
        total={totalCount ? totalCount : data.length}
        rowsPerPage={rowsPerPage}
        page={page}
      />
      {selectedItem && actionMenuAnchor && (
        <ActionMenu
          isEdit={!editExcluded.includes(tableFor)}
          tableFor={tableFor}
          isView={true}
          isDelete={true}
          isEditInvoice={!editExcluded.includes(tableFor)}
          handleView={viewItem}
          handleDelete={deleteItem}
          handleEdit={editItem}
          handleEditInvoice={editInvoice}
          close={closeActionMenu}
          selectedItem={selectedItem}
          anchorEl={actionMenuAnchor}
          actionMenuName={["View", "Edit Student", "Edit Invoice", "Delete"]}
          isConfirmationDeleteDialogVisible={isConfirmationDeleteDialogVisible}
          setRowSelectedId={setRowSelectedId}
          setIsConfirmationDeleteDialogVisible={
            setIsConfirmationDeleteDialogVisible
          }
        />
      )}
    </div>
  );
};
