import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1, 1),

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(100,150,120,0.5)",
    flexDirection: "column",
    height:'80%'
  },
  text: {
    color: "white",
  }
}));

export default function LocationContainer(props) {
  const classes = useStyles();
  const date = new Date();
  const formatDate = date.toLocaleString().split(", ");
  return (
    <div>
      <Paper className={classes.root} >
        <Typography className={classes.text} variant='h4' component="body1">
          {props.location}
        </Typography>
        <Typography className={classes.text} component="h3">
          {formatDate[1]}
        </Typography>
        <Typography className={classes.text} component="h2">
          {formatDate[0]}
        </Typography>
        {props.children}
      </Paper>
    </div>
  );
}
