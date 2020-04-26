import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around'
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
    <div className={classes.root}>
        <Typography className={classes.text} variant='h4'>
          {props.location}
        </Typography>
        <Typography className={classes.text} component="h3">
          {formatDate[1]}
        </Typography>
        <Typography className={classes.text} component="h2">
          {formatDate[0]}
        </Typography>
        {props.children}
    </div>
  );
}
