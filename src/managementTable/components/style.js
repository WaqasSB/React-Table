import { makeStyles } from "@material-ui/core";

export const layoutMenuStyles = makeStyles({
  popper: {
    zIndex: 1400,
  },
  paper: {
    width: 90,
    minHeight: 50,
    overflow: "hidden",
    boxShadow: "0px 20px 28px rgba(0, 0, 0, 0.25)",
    borderRadius: 0,
  },
  tabs: {
    height: 35,
    borderBottom: "1px solid lightgray",
    display: "flex",
  },
  tab: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    color: "black",
    "&:active": {
      color: "gray",
    },
  },
  selectedTab: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    color: "black",
    fontWeight: "bold",
    "&:active": {
      color: "gray",
    },
  },
  layoutMenus: {
    flex: 1,
    maxHeight: 180,
    padding: 3,
    overflow: "auto",
    display: "flex",
  },
  loader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingTop: 20,
  },
  menuOption: {
    padding: "5px 5px",
    fontWeight: "400",
    fontSize: 14,
    cursor: "pointer",
  },
});
