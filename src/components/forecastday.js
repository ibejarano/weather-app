import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(0, 1),
    margin: theme.spacing(0, 1),
    width: 100,
    height: '70%',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(100,150,120,0.5)",
    flexDirection: "column"
  },
  image: {
    width: "80%"
  },
  text: {
    color: "white"
  }
}));

export default function Forcastday(props) {
  const classes = useStyles();

  const { main, weather, dt_txt } = props.weather;

  const date = new Date(dt_txt);
  const dateHourly = date.toLocaleTimeString().split(":00:00");

  const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  return (
    <React.Fragment>
      <Paper className={classes.root} elevation={3}>
        <img className={classes.image} src={iconUrl} alt="forecast img" />
        <Typography className={classes.text}>
          {`${(main.temp - 273).toFixed(1)} °C`}
        </Typography>
        <Typography className={classes.text}>
          { dateHourly[0] + " " + dateHourly[1] }
        </Typography>
      </Paper>
    </React.Fragment>
  );
}
