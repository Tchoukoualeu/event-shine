import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { format } from 'date-fns';
import { API } from '../../api/api';

export const FormStatuses = {
  IDLE: 'IDLE',
  SAVING: 'SAVING',
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS'
};

const emptyValues = {
  firstName: '',
  lastName:  '',
  email:     '',
  date:      new Date().getTime()
};
const initialState = {
  values: emptyValues,
  status: FormStatuses.IDLE
};

export const saveData = createAsyncThunk('status/saveData', async (data) => {
  return await API.saveForm({
    ...data,
    date: new Date(format(new Date(data.date), 'yyyy-MM-dd')).toISOString()
  });
});

const formDataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    saveField: {
      reducer(state, action) {
        const { field, value } = action.payload;
        state.values[field] = value;
      },
      prepare(field, value) {
        return {
          payload: { field, value }
        };
      }
    },
    resetForm(state) {
      state.values = emptyValues;
    },
    resetStatus(state) {
      state.status = FormStatuses.IDLE;
    }
  },
  extraReducers: {
    [saveData.pending]: (state) => {
      state.status = FormStatuses.SAVING;
    },
    [saveData.fulfilled]: (state) => {
      state.values = emptyValues;
      state.status = FormStatuses.SUCCESS;
    },
    [saveData.rejected]: (state) => {
      state.status = FormStatuses.ERROR;
    }
  }
});

export const { saveField, resetForm, resetStatus } = formDataSlice.actions;

export default formDataSlice.reducer;
