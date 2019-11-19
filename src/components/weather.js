import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
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
        <div>
            <img className={classes.image} src={iconURL} alt="forcast img"/>

            <Typography className={classes.text} variant="h4" component="h2">
                {`${temperature} °C`}
            </Typography>

            <Typography className={classes.text} variant="h5" component="h4">
                {text}
            </Typography>
        </div>
    )
}