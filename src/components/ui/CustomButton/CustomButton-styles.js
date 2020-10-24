import { makeStyles } from "@material-ui/core";

export const S_customButton = makeStyles(theme => ({
  rootCustomButton: {
    display: "flex",
    flexWrap: "nowrap",
    justifyContent: "center",
  },
  btnLabel: {
    fontWeight: "bold",
    fontSize: "1rem !important",
    textTransform: "none",
    fontFamily: "Roboto",
    lineHeight: "1.31rem",
    letterSpacing: "2.1px",
  },

  endIcon: {
    fontSize: "2rem !important",
  },
}));
