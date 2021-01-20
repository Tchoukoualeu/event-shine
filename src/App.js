import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Form from './components/Form';
import BackdropLoader from './components/BackdropLoader';
import ErrorSnackBar from './components/FormSnackBar/ErrorSnackBar';
import SuccessSnackBar from './components/FormSnackBar/SuccessSnackBar';
import { FormStatuses, resetStatus } from './redux/reducers/formData';

import Container   from '@material-ui/core/Container';
import Box         from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography  from '@material-ui/core/Typography';

const App = () => {
  const status = useSelector((state) => state.form.data.status);
  const dispatch = useDispatch();
  const closeErrorBar = () => dispatch(resetStatus());

  return (
    <Container>
      <CssBaseline />
      <Box display='flex' flexDirection='column' alignItems='center' pt='15vh'>
        <Typography variant='h3' gutterBottom={true}>
          Event
        </Typography>
        <Form />
      </Box>
      <BackdropLoader open={status === FormStatuses.SAVING} />
      <ErrorSnackBar isOpen={status === FormStatuses.ERROR} onClose={closeErrorBar} />
      <SuccessSnackBar isOpen={status === FormStatuses.SUCCESS} onClose={closeErrorBar} />
    </Container>
  );
};

export default App;
