import React from "react";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import AlphabetBox from "./AlphabetBox";
import { checkValidArray, buttonList } from "../utils";
import BackspaceIcon from "@mui/icons-material/Backspace";

const Play = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [wordLength, setWordLength] = React.useState(5);
  const [playDetails, setPlayDetails] = React.useState({
    letters: [],
    activeStep: 0,
    innerActiveStep: 0,
  });
  const handleChange = (event) => {
    setWordLength(event.target.value);
  };
  const handleDialogClose = () => {
    let letters = [];
    for (let i = 0; i < wordLength; i++) {
      letters.push([]);
      for (let j = 0; j < wordLength; j++) {
        letters[i][j] = {
          letter: "",
        };
      }
    }
    setPlayDetails({
      activeStep: 0,
      innerActiveStep: 0,
      letters,
    });
    setOpen((prev) => !prev);
  };

  const handleEnter = () => {
    if (playDetails.innerActiveStep > wordLength - 1) {
      setPlayDetails((prev) => ({
        ...prev,
        activeStep: prev.activeStep + 1,
        innerActiveStep: 0,
      }));
    }
  };

  const handleBackSpace = () => {
    if (playDetails.innerActiveStep != 0) {
      const newPlayDetails = playDetails.letters;
      newPlayDetails[playDetails.activeStep][playDetails.innerActiveStep - 1] =
        {
          letter: "",
        };
      console.log();
      setPlayDetails((prev) => ({
        letters: playDetails.letters,
        activeStep: prev.activeStep,
        innerActiveStep: prev.innerActiveStep - 1,
      }));
    }
  };

  const handleButtonClick = (letter) => {
    if (
      typeof letter === "string" &&
      playDetails.innerActiveStep <= wordLength - 1 &&
      letter != "Enter"
    ) {
      const newPlayDetails = playDetails.letters;
      newPlayDetails[playDetails.activeStep][playDetails.innerActiveStep] = {
        letter,
      };
      setPlayDetails((prev) => ({
        letters: playDetails.letters,
        activeStep: prev.activeStep,
        innerActiveStep: prev.innerActiveStep + 1,
      }));
    }
  };
  return (
    <React.Fragment>
      {!open ? (
        <Grid
          container
          justifyContent={"space-around"}
          alignItems={"center"}
          spacing={2}
          sx={{
            height: "90vh",
          }}
        >
          <Grid item xs={11} sm={11} md={5}>
            <Grid
              container
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              {checkValidArray(playDetails.letters)
                ? playDetails.letters.map((subArr, mainIndex) => {
                    return (
                      <Grid item xs={12} key={mainIndex}>
                        <Grid
                          container
                          direction={"row"}
                          justifyContent={"center"}
                          alignItems={"center"}
                          sx={{
                            opacity:
                              playDetails.activeStep === mainIndex ? 1 : 0.5,
                          }}
                        >
                          {checkValidArray(subArr)
                            ? subArr.map(
                                ({
                                  letter,
                                  exact,
                                  defaultBox,
                                  contains,
                                  error,
                                }) => {
                                  return (
                                    <AlphabetBox
                                      letter={letter}
                                      exact={exact}
                                      defaultBox={defaultBox}
                                      contains={contains}
                                      error={error}
                                    />
                                  );
                                }
                              )
                            : null}
                        </Grid>
                      </Grid>
                    );
                  })
                : null}
            </Grid>
          </Grid>
          <Grid item xs={11} sm={11} md={6}>
            <Grid
              container
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Grid item xs={12}>
                {buttonList.map((subArr, index) => {
                  return (
                    <Grid
                      container
                      direction={"row"}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      {index === 2 ? (
                        <AlphabetBox
                          letter={"Enter"}
                          clickable={true}
                          onClick={handleEnter}
                        />
                      ) : null}
                      {subArr.map((letter) => {
                        return (
                          <AlphabetBox
                            letter={letter}
                            defaultBox={true}
                            clickable={true}
                            onClick={handleButtonClick}
                          />
                        );
                      })}
                      {index === 2 ? (
                        <AlphabetBox
                          letter={
                            <BackspaceIcon
                              color={theme.palette.primary.custom}
                            />
                          }
                          clickable={true}
                          onClick={handleBackSpace}
                        />
                      ) : null}
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : null}

      <Dialog maxWidth="sm" open={open} fullWidth disableScrollLock>
        <Grid
          container
          spacing={4}
          sx={{
            padding: "10px 0px",
          }}
          justifyContent={"center"}
        >
          <Grid
            item
            xs={12}
            sx={{
              boxShadow:
                " rgba(0, 0, 0, 0.3) 0px 1px 10px, rgba(0, 0, 0, 0.22) 0px 1px 10px",
              padding: "10px 5px",
              backgroundColor: theme.palette.primary.background,
            }}
          >
            <Grid
              container
              justifyContent={"space-around"}
              alignItems={"center"}
            >
              <Grid item xs={11}>
                <Typography
                  color={theme.palette.primary.custom}
                  fontWeight={600}
                  textTransform={"uppercase"}
                >
                  Set backup account
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={11}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6" fontWeight={600} color={"secondary"}>
                  Welcome to Wordly!
                </Typography>
                <Typography
                  variant="subtitle2"
                  fontWeight={600}
                  color={"secondary"}
                >
                  Lets play a game!.....
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container justifyContent={"center"} alignItems={"center"}>
                  <Grid item xs={12} sm={7}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      color={"secondary"}
                      sx={{
                        fontSize: "12px",
                      }}
                    >
                      Select no of letters you want to guess
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <FormControl fullWidth>
                      <InputLabel id="number-of-words-selected">
                        Word Length
                      </InputLabel>
                      <Select
                        labelId="number-of-words-selected"
                        id="numberOfWordsSelected"
                        value={wordLength}
                        onChange={handleChange}
                        label="Word Length"
                        required
                        fullWidth
                        color="secondary"
                        sx={{
                          color: theme.palette.primary.secondary,
                        }}
                      >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={6}>6</MenuItem>
                        <MenuItem value={7}>7</MenuItem>
                        <MenuItem value={8}>8</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container justifyContent={"center"} alignItems={"center"}>
                  <Grid item>
                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={handleDialogClose}
                    >
                      Let's Play!
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
    </React.Fragment>
  );
};

export default Play;
