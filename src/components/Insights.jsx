import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { Button } from "@mui/material";
const Insights = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const email = useSelector((state) => state.email);
  const [matchesPlayed, setMatchesPlayed] = React.useState([]);
  useEffect(() => {
    if (email) {
      async function callbackFun() {
        const url = `https://9wqwlf0xu4.execute-api.us-east-2.amazonaws.com/dev/playedMatches?email=${email}`;

        try {
          const response = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Accept-Encoding": "gzip, deflate, br",
              Accept: "*/*",
            },
          });
          const data = await response.json();
          console.log({ data });
          if (response.ok && data.response) {
            const eachMatchData = data.response
              .split(",")
              .filter((item) => item);
            const finalMatchesPlayed = eachMatchData.map((currentMatchStat) => {
              const [result, word] = currentMatchStat
                .split(":")
                .filter((item) => item);
              return {
                result: result === "Loose" ? false : true,
                word,
              };
            });
            console.log({ finalMatchesPlayed });
            setMatchesPlayed(finalMatchesPlayed);
          } else if (data.error && data.message) {
            enqueueSnackbar({
              message: data.message,
              preventDuplicate: true,
              autoHideDuration: 3000,
              variant: "info",
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
      }
      callbackFun();
    } else {
      navigate("/login");
    }
    return () => {};
  }, [email]);
  return (
    <Grid
      container
      spacing={2}
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Grid item xs={12}>
        Welcome {email}..!
      </Grid>
      <Grid item xs={12}>
        {Array.isArray(matchesPlayed) && matchesPlayed.length > 0 ? (
          <Grid container spacing={2}>
            {matchesPlayed.map(({ result, word }) => {
              return (
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    color={
                      result
                        ? theme.palette.primary.exact
                        : theme.palette.primary.contains
                    }
                  >
                    You {result ? "win" : "loose"} with word {word}
                  </Typography>
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <Typography
            variant="subtitle2"
            color={theme.palette.primary.contains}
          >
            No Matches Play
          </Typography>
        )}
      </Grid>
      <Grid item xs={12}>
        <Button
          onClick={() => {
            navigate("/");
          }}
          variant="contained"
          color="primary"
        >
          Lets play..!
        </Button>
      </Grid>
    </Grid>
  );
};

export default Insights;
