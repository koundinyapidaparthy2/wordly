import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { enqueueSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { setEmail } from "../store";

const Signin = () => {
  const disptach = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const [userDetails, setUserDetails] = React.useState({});
  const handleOnChange = (value, label) => {
    setUserDetails((prev) => ({ ...prev, [label]: value }));
  };
  const handleSignIn = async () => {
    if (userDetails.name && userDetails.email && userDetails.password) {
      const url = `https://541sh7s056.execute-api.us-east-2.amazonaws.com/dev/signin?name=${userDetails.name}&password=${userDetails.password}&email=${userDetails.email}`;

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
          localStorage.setItem("email", data.user_email);
          disptach(setEmail(data.user_email));
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
                Signin
              </Typography>
              <Typography variant="subtitle2" color={"primary"}>
                Join Us.....!
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
                    label="Enter Name"
                    placeholder="Enter Name"
                    value={userDetails.name}
                    onChange={(event) =>
                      handleOnChange(event.target.value, "name")
                    }
                    required
                  />
                </Grid>
                <Grid item xs={11}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Enter Email"
                    placeholder="Enter Email"
                    value={userDetails.email}
                    onChange={(event) =>
                      handleOnChange(event.target.value, "email")
                    }
                    required
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
                    onChange={(event) =>
                      handleOnChange(event.target.value, "password")
                    }
                    required
                  />
                </Grid>
                <Grid item>
                  <Button onClick={handleSignIn} variant="contained">
                    Sign In
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Divider>Or</Divider>
            </Grid>
            <Grid item xs={12}>
              <Grid container justifyContent={"center"} alignItems={"center"}>
                <Grid item>
                  <Typography variant="subtitle2">
                    Already have an account?
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2">
                    <Link
                      to="/login"
                      style={{
                        color: theme.palette.primary.main,
                        marginLeft: "10px",
                      }}
                    >
                      login{" "}
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

export default Signin;
