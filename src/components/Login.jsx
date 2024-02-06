import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { useTheme } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { setEmail } from "../store";
const Login = () => {
  const disptach = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const [userDetails, setUserDetails] = React.useState({});
  const handleOnChange = (value, label) => {
    setUserDetails((prev) => ({ ...prev, [label]: value }));
  };

  const handleLogIn = async () => {
    if (userDetails.email && userDetails.password) {
      const url = `https://u8px7rzzo7.execute-api.us-east-2.amazonaws.com/dev/login?password=${userDetails.password}&email=${userDetails.email}`;
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept-Encoding": "gzip, deflate, br",
            Accept: "*/*",
          },
        });
        const data = await response.json();
        if (response.ok && data.user_email) {
          disptach(setEmail(data.user_email));
          localStorage.setItem("email", data.user_email);
          navigate("/play");
        } else if (data.error && data.message) {
          enqueueSnackbar({
            message: data.message,
            preventDuplicate: true,
            autoHideDuration: 3000,
            variant: "error",
          });
        }
      } catch (error) {
        enqueueSnackbar({
          message: error.message,
          preventDuplicate: true,
          autoHideDuration: 3000,
          variant: "error",
        });
      }
    } else {
      enqueueSnackbar({
        message: "Provide valid email and password",
        preventDuplicate: true,
        autoHideDuration: 3000,
        variant: "error",
      });
    }
  };
  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        height: "90vh",
      }}
    >
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Card
          elevation={12}
          sx={{
            padding: "20px",
            borderRadius: "15px",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" color={"primary"}>
                Log In
              </Typography>
              <Typography variant="subtitle2" color={"primary"}>
                Lets Go...!
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid
                container
                spacing={2}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Grid item xs={11}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Enter Email"
                    placeholder="Enter Email"
                    value={userDetails.email}
                    required
                    onChange={(event) =>
                      handleOnChange(event.target.value, "email")
                    }
                  />
                </Grid>
                <Grid item xs={11}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Enter Password"
                    placeholder="Enter Password"
                    type="password"
                    value={userDetails.password}
                    required
                    onChange={(event) =>
                      handleOnChange(event.target.value, "password")
                    }
                  />
                </Grid>
                <Grid item>
                  <Button onClick={handleLogIn} variant="contained">
                    Log In
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={11}>
              <Divider>Or</Divider>
            </Grid>
            <Grid item xs={12}>
              <Grid container justifyContent={"center"} alignItems={"center"}>
                <Grid item>
                  <Typography variant="subtitle2">
                    Didn't have an account ?
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2">
                    <Link
                      to="/signin"
                      style={{
                        color: theme.palette.primary.main,
                        marginLeft: "10px",
                      }}
                    >
                      signin
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;
