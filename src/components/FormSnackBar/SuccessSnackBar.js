import React from 'react';
import FormSnackBar from './FormSnackBar';

/**
 * A wrapper of the FormSnackBar component for an alert of success.
 * @param {Object}   props
 * @param {boolean}  props.isOpen  - Inicates whether to show the FormSnackBar or not.
 * @param {Function} props.onClose - A callback that resets the form status in the store and is called in the FormSnackBar for its closing.
 */
export default function SuccessSnackBar({ isOpen, onClose }) {
  return (
    <FormSnackBar
      isOpen={isOpen}
      severity='success'
      message='The Event was successfully added!'
      onClose={onClose}
    />
  );
};
