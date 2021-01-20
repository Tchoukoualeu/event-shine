import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

/**
 * BackdropLoader adds a dimmed layer over the screen and a circular progress loader.
 * @param {Object}  props
 * @param {boolean} props.open - Inicates whether to show the Backdrop or not.
 */
const BackdropLoader = ({ open }) => {
  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open={open}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default BackdropLoader;
