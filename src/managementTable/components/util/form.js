import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
    height: 40,
  },
}));
const style = {
  position: "absolute",
  top: 8,
  right: 8,
  pointerEvents: "none",
};
const icon = () => {
  return (
    <svg
      id="dropdown_arrow"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      style={style}
    >
      <path
        id="Path_41103"
        data-name="Path 41103"
        d="M0,0H24V24H0Z"
        fill="none"
      />
      <path
        id="Union_1"
        data-name="Union 1"
        d="M10,0,5.014,4.986ZM0,0,4.987,4.986Z"
        transform="translate(7.4 9.786)"
        fill="none"
        stroke="#04acdd"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      />
    </svg>
  );
};
export const FormSelect = ({
  value,
  onChange,
  required = false,
  disabled = false,
  list,
  label,
  error,
  name,
}) => {
  const classes = useStyles();
  return (
    <FormControl
      variant="outlined"
      error={error}
      className={classes.formControl}
    >
      <InputLabel
        style={{ marginTop: value === "" ? -8 : 0 }}
        id="demo-simple-select-outlined-label"
        value
      >
        {label}
      </InputLabel>
      <Select
        disabled={disabled}
        required={required}
        style={{ height: 40 }}
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={value}
        onChange={onChange(name)}
        label={label}
        IconComponent={icon}
      >
        {list.map(({ value: itemValue, label: menuLabel }) => (
          <MenuItem key="itemValue" value={itemValue}>
            {menuLabel}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
