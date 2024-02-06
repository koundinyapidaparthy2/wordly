import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import InsightsIcon from "@mui/icons-material/Insights";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { setEmail } from "../store";
const Header = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const email = useSelector((state) => state.email);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handlePopper = () => {
    setOpen((prev) => !prev);
  };
  const handleClose = () => {
    dispatch(setEmail(""));
    handlePopper();
    localStorage.setItem("email", "");
    navigate("/signin");
  };
  return (
    <Grid
      container
      justifyContent={"space-between"}
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
          sx={{
            marginLeft: "20px",
          }}
        >
          Wordly
        </Typography>
      </Grid>
      <Grid item>
        <Grid container direction={"row"} spacing={2}>
          {email ? (
            <Grid item>
              <InsightsIcon
                sx={{
                  color: theme.palette.primary.custom,
                  cursor: "pointer",
                }}
              />
            </Grid>
          ) : null}

          <Grid item>
            <AccountCircleIcon
              sx={{
                color: theme.palette.primary.custom,
                marginRight: "20px",
                cursor: "pointer",
              }}
              onClick={() => {
                !email ? navigate("/signin") : handlePopper();
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Dialog open={open}>
        <DialogTitle>Do you want to log out ?</DialogTitle>
        <DialogActions>
          <Button onClick={handlePopper} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} variant="contained" color="primary">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default Header;
