import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  firstName: {
    onValidate: ['required'],
    valid: true,
    text: []
  },
  lastName: {
    onValidate: ['required'],
    valid: true,
    text: []
  },
  email: {
    onValidate: ['required', 'email'],
    valid: true,
    text: []
  }
};

const formValidSlice = createSlice({
  name: 'valid',
  initialState,
  reducers: {
    setValid: {
      reducer(state, action) {
        const { field, value } = action.payload;
        state[field].valid = value.valid;
        if (value.valid) {
          state[field].text = [];
        } else if (state[field].text.indexOf(value.text) === -1) {
          state[field].text.push(value.text);
        }
      },
      prepare(field, value) {
        return {
          payload: { field, value }
        };
      }
    },
    resetValid() {
      return initialState;
    }
  }
});

export const { setValid, resetValid } = formValidSlice.actions;

export default formValidSlice.reducer;
