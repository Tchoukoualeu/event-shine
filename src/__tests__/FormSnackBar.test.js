import React from 'react';
import { render, screen } from '../test-utils';
import userEvent from '@testing-library/user-event';

import FormSnackBar from '../components/FormSnackBar/FormSnackBar';

test('FormSnackBar renders with message', () => {
  // renders FormSnackBar component with mocked onClose function
  const onClickHandler = jest.fn();
  render(
    <FormSnackBar
      isOpen={true}
      severity='success'
      message='message1'
      onClose={onClickHandler}
    />
  );

  // FormSnackBar is present in the dom
  expect(screen.getByRole('alert')).toBeInTheDocument();
  // FormSnackBar contains "message1"
  expect(screen.getByRole('alert')).toContainElement(screen.getByText('message1'));
});

test('FormSnackBar onClick is called', () => {
  // renders FormSnackBar component with mocked onClose function
  const onClickHandler = jest.fn();
  render(
    <FormSnackBar
      isOpen={true}
      severity='success'
      message='message1'
      onClose={onClickHandler}
    />
  );

  // click close button in the FormSnackBar alert (it is single button in the test)
  userEvent.click(screen.getByRole('button'));
  // mocked onClose function is called
  expect(onClickHandler).toBeCalled();
});

test('FormSnackBar is not rendered', () => {
  // renders FormSnackBar component with mocked onClose function
  const onClickHandler = jest.fn();
  render(
    <FormSnackBar
      isOpen={false}
      severity='success'
      message='message1'
      onClose={onClickHandler}
    />
  );

  // FormSnackBar is not present in the dom
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
});
