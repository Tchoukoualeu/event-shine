import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import FormField      from './FormField';
import FormDatePicker from './FormDatePicker';
import { saveField, resetForm, saveData } from '../redux/reducers/formData';
import { resetValid, setValid } from '../redux/reducers/formValid';
import validation from '../utils/validation';

import { makeStyles } from '@material-ui/core/styles';
import Box            from '@material-ui/core/Box';
import Button         from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '500px',
    '& > *': {
      margin: theme.spacing(1),
    }
  },
  date: {
    backgroundColor: theme.palette.background.paper
  }
}));

/**
 * A Form with three inputs, a datepicker and two buttons to reset or submit the Form.
 */
const Form = () => {
  const classes = useStyles();
  const { data: { values }, valid } = useSelector((state) => state.form);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(saveField(event.target.id, event.target.value));
  };
  const onReset = () => {
    dispatch(resetForm());
    dispatch(resetValid());
  };
  const onSubmit = () => {
    Object.keys(values).forEach((field) => {
      if (typeof valid[field] !== 'undefined') {
        valid[field].onValidate.forEach((validateName) => {
          dispatch(setValid(field, validation[validateName](values[field])));
        });
      }
    });
    if (
      Object.keys(valid).every((field) => {
        return valid[field].valid && !validation.isEmptyField(values[field]);
      })
    ) {
      dispatch(saveData(values));
    }
  };

  return (
    <form className={classes.root} noValidate autoComplete='off'>
      <FormField
        id='firstName'
        label='First Name'
        onChange={handleChange}
      />
      <FormField
        id='lastName'
        label='Last Name'
        onChange={handleChange}
      />
      <FormField
        id='email'
        label='Email'
        onChange={handleChange}
      />
      <FormDatePicker />
      <Box display='flex' justifyContent='space-evenly'>
        <Button
          variant='contained'
          size='large'
          onClick={onReset}
        >
          Reset
        </Button>
        <Button
          variant='contained'
          size='large'
          color='primary'
          onClick={onSubmit}
        >
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default Form;
