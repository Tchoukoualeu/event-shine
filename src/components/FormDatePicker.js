import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { saveField } from '../redux/reducers/formData';
import validation    from '../utils/validation';

import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils   from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper
  }
}));

/**
 * Connected to the store DatePicker with an inner change handler, that puts current date if user tries to enter something manually.
 * The component is controlled, its value is stored in the Redux store in the state.form.data.values['id'], so its id is 'date'.
 */
const FormDatePicker = () => {
  const classes   = useStyles();
  const dispatch  = useDispatch();
  const dateValue = useSelector((state) => state.form.data.values.date);

  const handleDateChange = (date) => {
    const newDate = validation.isValidDate(date) ? new Date(date).getTime() : new Date().getTime();
    dispatch(saveField('date', newDate));
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        fullWidth
        inputProps={{
          className: classes.root
        }}
        variant='inline'
        format='dd/MM/yyyy'
        id='date'
        label='Date'
        value={dateValue}
        onChange={handleDateChange}
        required={true}
      />
    </MuiPickersUtilsProvider>
  );
};

export default FormDatePicker;
