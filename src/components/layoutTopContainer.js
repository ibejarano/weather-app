import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(1, 1),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: "rgba(100,150,120,0.5)",
        flexDirection: 'row',
        width: '70%'
    }
  }));


export default function LayoutTopContainer(props) {

    const classes = useStyles();

        return( 
        <React.Fragment>
        <Paper className={classes.root} elevation={8} >
            {props.children}
        </Paper>
        </React.Fragment>
    )
}