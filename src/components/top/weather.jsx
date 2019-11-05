import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(1, 1),

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'violet',
        flexDirection: 'column'
    },
    image: {
    width: '80%'
    },
    text: {
        color: 'white'
    }
  }));


export default function Weather({location, temperature, text, iconURL }) {

    const classes = useStyles();

        return( 
        <React.Fragment>
        <Paper className={classes.root} elevation="8" >
            <Typography className={classes.text} variant="p" component="h3">
                {location}
            </Typography>

            <img className={classes.image} src={iconURL} alt="forcast img"/>

            <Typography className={classes.text} variant="h6" component="h2">
                {`${temperature} °C`}
            </Typography>

            <Typography className={classes.text} variant="p" component="h4">
                {text}
            </Typography>

        </Paper>
        </React.Fragment>
    )
}