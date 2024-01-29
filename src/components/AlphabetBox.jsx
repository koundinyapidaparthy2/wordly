import React from "react";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
const AlphabetBox = ({
  letter,
  exact,
  contains,
  error,
  defaultBox,
  clickable = false,
  onClick = () => {},
}) => {
  const theme = useTheme();
  let stylesBox = {};
  if (defaultBox) {
    stylesBox = {};
  }
  if (exact) {
    stylesBox = {
      color: theme.palette.primary.custom,
      background: theme.palette.primary.exact,
      border: "0px",
    };
  }
  if (contains) {
    stylesBox = {
      border: "0px",
      color: theme.palette.primary.custom,
      background: theme.palette.primary.contains,
    };
  }
  if (error) {
    stylesBox = {
      border: "0px",
      color: theme.palette.primary.custom,
      background: theme.palette.primary.error,
    };
  }
  return (
    <Grid
      item
      sx={{
        minWidth: "20px",
        height: "20px",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        border: "2px solid black",
        borderRadius: "4px",
        padding: "15px",
        fontWeight: 600,
        margin: "2px",
        cursor: clickable ? "pointer" : "none",
        ...stylesBox,
      }}
      onClick={() => {
        if (clickable) {
          onClick(letter);
        }
      }}
    >
      {letter}
    </Grid>
  );
};

export default AlphabetBox;
