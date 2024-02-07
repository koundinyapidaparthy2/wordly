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
import { useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";
import Grow from "./Grow";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
const Play = () => {
  const theme = useTheme();
  const email = useSelector((state) => state.email);
  const [open, setOpen] = React.useState(true);
  const [wordLength, setWordLength] = React.useState(5);
  const [playDetails, setPlayDetails] = React.useState({
    letters: [],
    activeStep: 0,
    innerActiveStep: 0,
    choiceWord: "",
    wordLength: 5,
  });
  const [disableWordList, setDisableWordList] = React.useState([]);
  const handleChange = (event) => {
    setWordLength(event.target.value);
  };

  const storeUserMatchHistory = async (choiceWord, win) => {
    const url = `https://iwup0n6849.execute-api.us-east-2.amazonaws.com/dev/storeMatchResult?email=${email}&result=${
      win ? "Win" : "Loose"
    }:${choiceWord},`;
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        Accept: "*/*",
      },
    });
  };

  const handleDialogClose = async () => {
    const url = `https://qnt1r5fod2.execute-api.us-east-2.amazonaws.com/dev/letsplay?email=${email}&word=${wordLength}`;

    try {
      enqueueSnackbar({
        message: "Just for a sec",
        preventDuplicate: true,
        autoHideDuration: 3000,
        variant: "info",
      });
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Encoding": "gzip, deflate, br",
          Accept: "*/*",
        },
      });

      const data = await response.json();
      if (response.ok && data.choiceword) {
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
          choiceWord: data.choiceword,
          wordLength,
        });
        setOpen((prev) => !prev);
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
  };

  const handleEnter = () => {
    let weWon = false;
    const choiceWord = playDetails.choiceWord;
    if (playDetails.innerActiveStep > wordLength - 1) {
      const currentStep = playDetails.activeStep;
      const prevPlayDetails = playDetails.letters.slice(0, currentStep);
      let currentPlayDetails = playDetails.letters[currentStep];
      const nextPlayDetails = playDetails.letters.splice(currentStep + 1);
      currentPlayDetails = currentPlayDetails.map(({ letter }, index) => {
        const updatedLetter = letter.toLowerCase();
        if (updatedLetter.toLowerCase() === Array.from(choiceWord)[index]) {
          return {
            letter: letter,
            exact: true,
          };
        }
        if (choiceWord.includes(updatedLetter)) {
          return {
            letter: letter,
            contains: true,
          };
        } else {
          return {
            letter: letter,
            error: true,
          };
        }
      });
      let successInThisStep =
        currentPlayDetails.find(({ error, contains }) => error || contains) ||
        {};
      if (!successInThisStep.letter) {
        weWon = true;
      }
      const finalPlayDetails = [
        ...prevPlayDetails,
        currentPlayDetails,
        ...nextPlayDetails,
      ];

      setPlayDetails((prev) => ({
        ...prev,
        activeStep: prev.activeStep + 1,
        innerActiveStep: 0,
        letters: finalPlayDetails,
      }));
    } else {
      enqueueSnackbar({
        message: `Minimum ${wordLength} Characters required`,
        preventDuplicate: true,
        autoHideDuration: 3000,
        variant: "error",
      });
    }

    if (playDetails.activeStep >= wordLength - 1 && !weWon) {
      storeUserMatchHistory(choiceWord, false);
      setPlayDetails((prev) => ({
        activeStep: 0,
        innerActiveStep: 0,
        letters: [],
      }));
      setOpen((prev) => !prev);
      enqueueSnackbar({
        message: `We lost the word 😔`,
        anchorOrigin: { horizontal: "center", vertical: "top" },
        TransitionComponent: Grow,
        preventDuplicate: true,
        autoHideDuration: 3000,
        variant: "error",
      });
    } else if (weWon) {
      storeUserMatchHistory(choiceWord, false);
      setPlayDetails((prev) => ({
        activeStep: 0,
        innerActiveStep: 0,
        letters: [],
      }));
      setOpen((prev) => !prev);
      enqueueSnackbar({
        message: `We won the word ${choiceWord} 🎉`,
        anchorOrigin: { horizontal: "center", vertical: "top" },
        TransitionComponent: Grow,
        preventDuplicate: true,
        autoHideDuration: 3000,
        variant: "success",
      });
    }
  };

  const handleBackSpace = () => {
    if (playDetails.innerActiveStep != 0) {
      playDetails.letters[playDetails.activeStep][
        playDetails.innerActiveStep - 1
      ] = {
        letter: "",
      };
      setPlayDetails((prev) => ({
        ...prev,
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
        ...prev,
        letters: playDetails.letters,
        activeStep: prev.activeStep,
        innerActiveStep: prev.innerActiveStep + 1,
      }));
    }
  };

  React.useEffect(() => {
    const letters = playDetails.letters || [];
    const finalDisableWords = [];
    letters.forEach((rowWise) => {
      rowWise.forEach(({ letter, error }) => {
        if (error) {
          finalDisableWords.push(letter);
        }
      });
    });
    setDisableWordList(finalDisableWords);
    return () => {};
  }, [playDetails.activeStep]);
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
                        const error =
                          disableWordList.filter(
                            (eachWord) => eachWord === letter
                          ).length > 0;
                        return (
                          <AlphabetBox
                            letter={letter}
                            defaultBox={true}
                            error={error}
                            clickable={error ? false : true}
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
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked
                        sx={{
                          color: theme.palette.primary.exact,
                          "&.Mui-checked": {
                            color: theme.palette.primary.exact,
                          },
                        }}
                      />
                    }
                    label="Exact letter"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked
                        sx={{
                          color: theme.palette.primary.contains,
                          "&.Mui-checked": {
                            color: theme.palette.primary.contains,
                          },
                        }}
                      />
                    }
                    label="Letter exist in the word"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked
                        sx={{
                          color: theme.palette.primary.error,
                          "&.Mui-checked": {
                            color: theme.palette.primary.error,
                          },
                        }}
                      />
                    }
                    label="Letter Does not exist"
                  />
                </FormGroup>
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
