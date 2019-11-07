import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(1, 1),
        width: 80,
        height: 80,
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

export default function Forcastday(props) {
    const classes = useStyles();

    const { main,  weather } = props.weather

    const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`

    return ( 
        <React.Fragment>

        <Paper className={classes.root} elevation="3" >
            <img className={classes.image} src={iconUrl} alt="forcast img"/>
            <Typography className={classes.text} variant="h6" component="h2">
                {`${(main.temp - 273).toFixed(1)} °C`}
            </Typography>
        </Paper>
        </React.Fragment>

    );
}
