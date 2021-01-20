import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from './redux/store';

const customRender = (
  ui,
  renderOptions = {}
) => {
  const Wrapper = ({ children }) => (
    <Provider store={store}>
      {children}
    </Provider>
  );
  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

// re-export everything
export * from '@testing-library/react';
// override render method
export { customRender as render };
