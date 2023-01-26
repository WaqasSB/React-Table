import React, { useState, useEffect } from "react";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import TableCell from "@material-ui/core/TableCell";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Avatar } from "@material-ui/core";
// import { setAlert } from "../../../redux/reducers/alert";
// import { editUser } from "../../../api/users";
import { useSelector } from "react-redux";
import { FormSelect } from "./util/form";

export const UserRow = ({
  isItemSelected,
  handleClick,
  selectionKey,
  row,
  columns,
  openActionMenu,
  actionButtonClass,
  labelId,
}) => {
  // const dispatch = useDispatch();

  const [status, setStatus] = useState(true);
  const [role, setRole] = useState("");

  // const { token } = useSelector((state) => state.user);

  useEffect(() => {
    setStatus(row["status"]);
    setRole(row["role"]);
  }, [row, setStatus, setRole]);

/*   const showErrorAlert = (message) => {
    dispatch(
      setAlert({
        severity: "error",
        message,
        show: true,
      })
    );
  };
 */

  const updateUser = async (data) => {
  /*   try {
      const response = await editUser(data, row["id"], token);
      if (!response.status)
        showErrorAlert(response.message || "Error in updating user");
    } catch (err) {
      console.log("Error is: ", err);
      showErrorAlert(err.message || "Error in updating user");
    } */
  };

  const handleChange = (prop) => (event) => {
    if (prop === "role") {
      updateUser({ role: event.target.value });
      setRole(event.target.value);
    }

    if (prop === "status") {
      updateUser({ status: event.target.value === "active" ? true : false });
      setStatus(event.target.value === "active" ? true : false);
    }
  };
  const user = useSelector((state) => state.user);
  return (
    <>
      {row["id"] !== user.id ? (
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
          <TableCell
            align="left"
            style={{ display: "flex", alignItems: "center" }}
          >
            <Avatar style={{ height: 40, width: 40, marginRight: 20 }}>
              {row ? row["firstName"] : <></>}
            </Avatar>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>{`${row["firstName"]} ${row["lastName"]}`}</div>
              <div style={{ fontSize: 12, color: "gray" }}>{row["email"]}</div>
            </div>
          </TableCell>
          <TableCell align="left" style={{ width: 300, paddingRight: 100 }}>
            {user.role === "readOnly" ? (
              <FormSelect
                disabled={true}
                error={false}
                list={[
                  {
                    value: "active",
                    label: "Active",
                  },
                  {
                    value: "inactive",
                    label: "In Active",
                  },
                ]}
                value={status ? "active" : "inactive"}
                name="status"
                onChange={handleChange}
              />
            ) : (
              <FormSelect
                error={false}
                list={[
                  {
                    value: "active",
                    label: "Active",
                  },
                  {
                    value: "inactive",
                    label: "In Active",
                  },
                ]}
                value={status ? "active" : "inactive"}
                name="status"
                onChange={handleChange}
              />
            )}
          </TableCell>
          <TableCell align="left" style={{ width: 300, paddingRight: 100 }}>
            {user.role === "readOnly" ? (
              <FormSelect
                disabled={true}
                error={false}
                list={[
                  {
                    value: "manager",
                    label: "Manager",
                  },
                  {
                    value: "readOnly",
                    label: "Read-Only",
                  },
                ]}
                value={role}
                name="role"
                onChange={handleChange}
              />
            ) : (
              <FormSelect
                error={false}
                list={[
                  {
                    value: "manager",
                    label: "Manager",
                  },
                  {
                    value: "readOnly",
                    label: "Read-Only",
                  },
                ]}
                value={role}
                name="role"
                onChange={handleChange}
              />
            )}
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
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </TableRow>
      ) : (
        <></>
      )}
    </>
  );
};
