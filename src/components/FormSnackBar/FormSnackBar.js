import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

/**
 * FormSnackBar shows an alert with a message and is closed on click on the close button or upon 5 seconds timeout.
 * @param {Object}            props
 * @param {boolean}           props.isOpen   - Inicates whether to show the FormSnackBar or not.
 * @param {'success'|'error'} props.severity - A type of the alert.
 * @param {string}            props.message  - A message to show in the alert.
 * @param {Function}          props.onClose  - A callback that is called when the alert is closed either with close button or upon 5 seconds timeout.
 */
const FormSnackBar = ({ isOpen, severity, message, onClose }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Snackbar open={isOpen} autoHideDuration={5000} onClose={onClose}>
        <MuiAlert
          elevation={6}
          variant='filled'
          severity={severity}
          onClose={onClose}
        >
          {message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default FormSnackBar;
