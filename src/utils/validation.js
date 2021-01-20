import isDate from 'validator/lib/isDate';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';

const validation = {
  isValidDate(value) {
    return isDate(value);
  },
  isEmptyField(value) {
    return isEmpty(value, { ignore_whitespace: true });
  },
  required(value) {
    const valid = !validation.isEmptyField(value);
    return {
      valid,
      ...{
        text: valid ? undefined : 'This field is required.'
      }
    };
  },
  email(value) {
    const valid = isEmail(value);
    return {
      valid,
      ...{
        text: valid ? undefined : 'The email is invalid.'
      }
    };
  }
}

export default validation;
