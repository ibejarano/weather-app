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
        backgroundColor: "rgba(100,150,120,0.5)",
        flexDirection: 'column'
    },
    image: {
    width: '80%'
    },
    text: {
        color: 'white'
    }
  }));


export default function Weather({temperature, text, iconURL }) {

    const classes = useStyles();

        return( 
        <React.Fragment>
        <Paper className={classes.root} elevation={8} >
            <img className={classes.image} src={iconURL} alt="forcast img"/>

            <Typography className={classes.text} variant="h4" component="h2">
                {`${temperature} °C`}
            </Typography>

            <Typography className={classes.text} variant="h5" component="h4">
                {text}
            </Typography>

        </Paper>
        </React.Fragment>
    )
}