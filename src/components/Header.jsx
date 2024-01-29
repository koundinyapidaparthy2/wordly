import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
const Header = () => {
  const theme = useTheme();
  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        height: "60px",
        backgroundColor: theme.palette.primary.background,
      }}
    >
      <Grid item>
        <Typography
          variant="h6"
          color={theme.palette.primary.custom}
          fontWeight={900}
        >
          Wordly
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Header;
