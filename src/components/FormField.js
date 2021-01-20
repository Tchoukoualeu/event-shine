import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setValid } from '../redux/reducers/formValid';
import { useValid } from '../utils/useValid';
import validation   from '../utils/validation';

import { makeStyles } from '@material-ui/core/styles';
import TextField      from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper
  }
}));

/**
 * Connected to the store TextField with a validation check of a value performed when a user's focus leaves it.
 * The component is controlled, its value is stored in the Redux store.
 * @param {Object}   props
 * @param {string}   props.id            - Id of the field, it should be the same in the store (for ex., state.form.data.values['name']).
 * @param {number}   props.label         - Label of the field.
 * @param {Function} props.onChange      - On change handler, it saves field's value into the store.
 * @param {string}   [props.placeholder] - Placeholder of the field, it is false by default, and if it is so, label's value is used instead.
 */
const FormField = ({
  id,
  label,
  onChange,
  placeholder = false
}) => {
  const classes    = useStyles();
  const dispatch   = useDispatch();
  const fieldValue = useSelector((state) => state.form.data.values[id]);
  const validValue = useValid(id);
  const isValidate = !!validValue;
  const isInvalid  = isValidate && !validValue.valid;

  const onBlur = () => {
    if (isValidate) {
      validValue.onValidate.forEach((validateName) => {
        dispatch(setValid(id, validation[validateName](fieldValue)));
      });
    }
  };

  return (
    <TextField
      inputProps={{
        className: classes.root
      }}
      error={isInvalid}
      helperText={isInvalid && validValue.text}
      fullWidth
      id={id}
      label={label}
      onBlur={onBlur}
      onChange={onChange}
      placeholder={placeholder || label}
      required={isValidate}
      value={fieldValue}
      variant='outlined'
    />
  );
};

export default FormField;
