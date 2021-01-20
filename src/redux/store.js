import { configureStore, combineReducers } from '@reduxjs/toolkit';

import formDataReducer  from './reducers/formData';
import formValidReducer from './reducers/formValid';

const store = configureStore({
  reducer: {
    form: combineReducers({
      data: formDataReducer,
      valid: formValidReducer
    })
  }
});

export default store;
