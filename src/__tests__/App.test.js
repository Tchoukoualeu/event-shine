import React from 'react';
import { render, screen, fireEvent, waitFor } from '../test-utils';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import format from 'date-fns/format';

import App from '../App';

/**
 * A helper function that returns an element with role 'textbox' and specified 'name' from the dom.
 * @param {string} name - The text of the element.
 * @return The html element
 */
const getField = (name) => screen.getByRole('textbox', { name });
/**
 * A helper function that returns an element with role 'button' and specified 'name' from the dom.
 * @param {string} name - The text of the element.
 * @return The html element
 */
const getByRoleButton = (name) => screen.getByRole('button', { name });

/**
 * A helper function that renders App component and returns its inner elements.
 * @return {Object}      result
 * @return {HTMLElement} result.firstNameField - FirstName input
 * @return {HTMLElement} result.lastNameField  - LastName input
 * @return {HTMLElement} result.emailField     - Email input
 * @return {HTMLElement} result.dateField      - Date datepicker
 * @return {HTMLElement} result.resetButton    - Reset button
 * @return {HTMLElement} result.submitButton   - Submit button
 */
const renderApp = () => {
  render(<App />);

  return {
    firstNameField: getField('First Name'),
    lastNameField:  getField('Last Name'),
    emailField:     getField('Email'),
    dateField:      getField('Date'),
    resetButton:    getByRoleButton('Reset'),
    submitButton:   getByRoleButton('Submit')
  };
};

describe('App fields', () => {
  it('renders with fields', () => {
    // renders App component
    const { firstNameField, lastNameField, emailField, dateField } = renderApp();

    // fields are present in the dom
    expect(firstNameField).toBeInTheDocument();
    expect(lastNameField).toBeInTheDocument();
    expect(emailField).toBeInTheDocument();
    expect(dateField).toBeInTheDocument();
  });

  it('renders with buttons', () => {
    // renders App component
    const { resetButton, submitButton } = renderApp();

    // buttons are present in the dom
    expect(resetButton).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('renders without error messages', () => {
    // renders App component
    renderApp();

    // no field has an error message just after the rendering
    expect(screen.queryByText(/this field is required\./i)).not.toBeInTheDocument();
  });

  it('shows error messages "required"', () => {
    // renders App component
    renderApp();

    // focus each field one by one with the simulation of the Tab button pressing
    userEvent.tab();
    userEvent.tab();
    userEvent.tab();
    userEvent.tab();

    // Text Fields have the "This field is required." error message
    expect(screen.getAllByText(/this field is required\./i)).toHaveLength(3);
  });

  it('shows error messages "required" and "email" when Submit is clicked with empty fields', () => {
    // renders App component
    const { submitButton } = renderApp();

    // click the Submit button
    userEvent.click(submitButton);
    // "This field is required." and "The email is invalid." message are displayed.
    expect(screen.getAllByText(/this field is required\./i)).toHaveLength(3);
    expect(screen.getByText(/the email is invalid\./i)).toBeInTheDocument();
  });

  it('shows error message "email"', () => {
    // renders App component
    const { emailField } = renderApp();

    // type an incorrect email inside the Email field.
    userEvent.type(emailField, 'q@a.z');
    userEvent.tab();
    // "The email is invalid." message is displayed.
    expect(screen.getByText(/the email is invalid\./i)).toBeInTheDocument();
  });

  it('resets form when Reset button clicked', () => {
    // renders App component
    const { firstNameField, lastNameField, emailField, resetButton } = renderApp();

    // fill out all the Text Fields
    userEvent.type(firstNameField, 'qwe');
    userEvent.type(lastNameField, 'asd');
    userEvent.type(emailField, 'q@a.z');
    // click the Reset button
    userEvent.click(resetButton);

    // all the Text Fields are empty
    expect(firstNameField).toHaveValue('');
    expect(lastNameField).toHaveValue('');
    expect(emailField).toHaveValue('');
  });

  it('changes date', () => {
    // renders App component
    const { dateField } = renderApp();
    const date = new Date();
    // calculate tomorrow's day ...
    let clickDate = date.getDate() + 1;

    // ... or 20st day
    if (clickDate >= 28) {
      clickDate = 20;
    }

    // current date is displayed in the Date Field
    expect(dateField).toHaveValue(format(date, 'dd/MM/yyyy'));

    // click the datepicker icon
    userEvent.click(screen.getAllByRole('button')[0]);
    // change date
    userEvent.click(getByRoleButton(clickDate));

    // the tomorrow's date is displayed in the Date Field
    expect(dateField).toHaveValue(format(date.setDate(clickDate), 'dd/MM/yyyy'));
  });

  it('changes date to invalid value and it returns to current date', () => {
    // renders App component
    const { dateField } = renderApp();
    const date = new Date();

    // enter incorrect value to the Date Field
    fireEvent.change(dateField, { target: { value: '1' } })

    // current date is displayed in the Date Field
    expect(dateField).toHaveValue(format(date, 'dd/MM/yyyy'));
  });
});

jest.mock('axios');

describe('App and SnackBar', () => {
  it('submits form and the success SnackBar is displayed', async () => {
    // mock an axious request to be fullfilled successfully
    axios.post.mockImplementationOnce(() => Promise.resolve({ status: 200 }));
    // renders App component
    const { firstNameField, lastNameField, emailField, submitButton } = renderApp();

    // fill out all the Text Fields
    userEvent.type(firstNameField, 'qwe');
    userEvent.type(lastNameField, 'asd');
    userEvent.type(emailField, 'qwe@asd.zxc');
    // click the Submit button
    userEvent.click(submitButton);

    // wait for the loading progress bar not to be displayed
    await waitFor(
      () => expect(screen.queryByRole('progressbar', { hidden: false })).not.toBeInTheDocument()
    );

    // the alert is displayed with the success message
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(
      screen.getByRole('alert')
    ).toContainElement(
      screen.getByText('The Event was successfully added!')
    );

    // all the Text Fields are empty after the form submit
    expect(firstNameField).toHaveValue('');
    expect(lastNameField).toHaveValue('');
    expect(emailField).toHaveValue('');
  });

  it('submits form when Submit button is clicked', () => {
    // mock an axious request to be fullfilled successfully
    axios.post.mockImplementationOnce(() => Promise.resolve());
    // renders App component
    const { firstNameField, lastNameField, emailField, submitButton } = renderApp();

    // fill out all the Text Fields
    userEvent.type(firstNameField, 'qwe');
    userEvent.type(lastNameField, 'asd');
    userEvent.type(emailField, 'qwe@asd.zxc');
    // click the Submit button
    userEvent.click(submitButton);

    // the loading progress bar is displayed
    expect(screen.getByRole('progressbar', { hidden: true })).toBeInTheDocument();
  });

  it('submits form and close SnackBar after an error', () => {
    // mock an axious request to be fullfilled with an error
    axios.post.mockImplementationOnce(() => Promise.reject(new Error()));
    // renders App component
    const { firstNameField, lastNameField, emailField, submitButton } = renderApp();

    // fill out all the Text Fields
    userEvent.type(firstNameField, 'qwe');
    userEvent.type(lastNameField, 'asd');
    userEvent.type(emailField, 'qwe@asd.zxc');
    // click the Submit button
    userEvent.click(submitButton);

    // the alert is displayed with the error message
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(
      screen.getByRole('alert')
    ).toContainElement(
      screen.getByText('Something went wrong!')
    );
    // close the alert
    userEvent.click(screen.getByRole('button', { name: /close/i}));

    // the Submit button is clickable
    userEvent.click(submitButton);
  });
});
